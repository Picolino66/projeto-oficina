// src/models/orcamentoModel.js
import { PrismaClient, Orcamento, Prisma } from '@prisma/client';
import OrcamentoDto from '../dtos/orcamentoDTO';
import prisma from './prismaClient';

export class OrcamentoModel {

  async createOrcamento(orcamentoData: OrcamentoDto) {
    try {
      return await prisma.orcamento.create({
        data: {
          descricao: orcamentoData.descricao,
          cliente: orcamentoData.cliente
        }
      });
    } catch (error: unknown) {
      throw error;
    }
  }

  async getOrcamentos() {
    try {
      return prisma.orcamento.findMany({
        where: { visivel: true }
      });
    } catch (error: unknown) {
      throw error;
    }
  }

  async getOrcamentoById(id: any) {
    try {
      return prisma.orcamento.findUnique({ 
        where: { 
          id ,
          visivel: true
        }, 
      });
    } catch (error: unknown) {
      throw error;
    }
  }

  async updateOrcamentoById(id: any, orcamentoData: Partial<Orcamento>) {
    try {
      const updatedOrcamento = await prisma.orcamento.update({
        where: { id },
        data: {
          descricao: orcamentoData.descricao,
          cliente: orcamentoData.cliente
        },
      });
      return updatedOrcamento;
    } catch (error: unknown) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new Error('Orcamento não encontrado.');
        }
      }
      throw error;
    }
  }

  async deleteOrcamentoById(id: any) {
    try {
      await prisma.orcamento.update({ 
        where: { id },
        data: { visivel: false }
      });
    } catch (error: unknown) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new Error('Orcamento não encontrado.');
        }
      }
      throw error;
    }
  }
}
