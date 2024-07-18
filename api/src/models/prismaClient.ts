// Responsavel por fazer o regsitro de logs	
// prismaClient.js
import { config } from 'dotenv';
import { PrismaClient } from '@prisma/client';

// Carrega as variáveis de ambiente do arquivo .env
config();

const prisma = new PrismaClient();

prisma.$use(async (params, next) => {
    //console.log('params', params);
  const result = await next(params);

  if (['create', 'update', 'delete', 'updateMany'].includes(params.action)&& !params.model?.includes('AuditLog')) {
    try {
    await prisma.auditLog.create({
      data: {
        action: params.action,
        table: params.model?.toString() || '',
        data: JSON.stringify(params.args.data || {}),
        where: JSON.stringify(params.args?.where || {}),
        //timestamp: new Date(),
        //message: ""
      }
    });
  }
    catch (error: unknown) {
        console.log('error', error);
    }
    }

  return result;
});

export default prisma;