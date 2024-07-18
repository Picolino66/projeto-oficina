// src/models/funcionarioServicoModel.js
import { PrismaClient, FuncionarioServico, Prisma } from '@prisma/client';
import funcionarioServicoDTO from '../dtos/funcionarioServicoDTO';
import e from 'express';
import prisma from './prismaClient';

export class FuncionarioServicoModel {

  async createFuncionarioServico(data: funcionarioServicoDTO) {
    try {
      return await prisma.funcionarioServico.create({
        data: {
          funcionarioId: data.funcionarioId,
          servicoId: data.servicoId,
          comissao_porcentagem: data.comissaoPerc,
          comissao_valor: data.comissaoMone
        }
      });
    } catch (error: unknown) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2003' && error.meta && error.meta.field_name === 'funcionarioId') {
          throw new Error('Funcionario não encontrado.');
        }
        else if (error.code === 'P2003' && error.meta && error.meta.field_name === 'servicoId') {
          throw new Error('Serviço não encontrado.');
        }
        // já existe um funcionarioServico com esse funcionarioId e servicoId
        else if (error.code === 'P2002') {
          throw new Error('Já existe uma comissão para esse funcionario neste servico.');
        }
      }
      throw error;
    }
  }

  async getFuncionarioServicos() {
    try {
      return prisma.funcionarioServico.findMany({
        where: {
          visivel: true
        },
        include: {
          funcionario: {},
          servico: {}
        }, 
        orderBy: {comissao_porcentagem: 'asc'}
      });
    } catch (error: unknown) {
      throw error;
    }
  }

  async getFuncionarioById(funcionarioId: string) {
    try {
      return await prisma.funcionarioServico.findMany({ 
        where: { 
          funcionarioId: funcionarioId 
        }, 
        include: { 
          funcionario: true,
          servico: {
            include: {
              veiculo: true,
              cliente: true
            },
          },
        } 
      });
    } catch (error: unknown) {
      throw error;
    }
  }  

  async getFuncionarioServicoById(funcionarioId: string, servicoId: string) {
    try {
      return prisma.funcionarioServico.findUnique({
        where: { 
          funcionarioId_servicoId: { funcionarioId, servicoId },
          visivel: true
        }, 
        include: {
          funcionario: {}, 
          servico: {}
        }
      });
    } catch (error: unknown) {
      throw error;
    }
  }

  async updateFuncionarioServicoById(funcionarioId: any, servicoId: any, funcionarioServico: Partial<FuncionarioServico>) {
    try {
      const updatedFuncionarioServico = await prisma.funcionarioServico.update({
        where: { funcionarioId_servicoId: { funcionarioId, servicoId } },
        data: {
          funcionarioId: funcionarioServico.funcionarioId,
          servicoId: funcionarioServico.servicoId,
          comissao_porcentagem: funcionarioServico.comissao_porcentagem,
          comissao_valor: funcionarioServico.comissao_valor
        },
      });
      return updatedFuncionarioServico;
    } catch (error: unknown) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new Error('Não foi encontrado uma relação desse funcionário com esse serviço.');
        }
        else if (error.code === 'P2003' && error.meta && error.meta.field_name === 'funcionarioId') {
          throw new Error('Funcionario não encontrado.');
        }
        else if (error.code === 'P2003' && error.meta && error.meta.field_name === 'servicoId') {
          throw new Error('Serviço não encontrado.');
        }
      }
      throw error;
    }
  }

  async deleteFuncionarioServicoById(funcionarioId: any, servicoId: any) {
    try {
      await prisma.funcionarioServico.update({ 
        where: { funcionarioId_servicoId: { funcionarioId, servicoId }},
        data: {visivel: false}
      });
    } catch (error: unknown) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new Error('Não foi encontrado uma relação desse funcionário com esse serviço.');
        }
      }
      throw error;
    }
  }

  async getServicosPageByFuncionario(page: number, pageSize: number, funcionarioId: string) {
    const skip = (page - 1) * pageSize;
    const take = pageSize;
    
    try {
      return prisma.funcionarioServico.findMany({
        where: {
          visivel: true,
          funcionarioId: {
            contains: funcionarioId,
          },
        },
        include: {
          funcionario: {},
          servico: {}
        },
        orderBy: { 
          servico:{
            dataInicio: 'desc' 
          } 
        },
        skip: skip,
        take: take,
      });
    } catch (error: unknown) {
      throw error;
    }
  }
  
  async getTotalServicosByFuncionario(funcionarioId: string) {
    // Inicializa o objeto where com base no filtroPagamento
    let where = {
      visivel: true,
      funcionarioId: {
        contains: funcionarioId,
      },
    } as any;
    return await prisma.funcionarioServico.count({
      where: where
    });
  }

}

