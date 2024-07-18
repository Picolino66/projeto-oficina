// src/models/funcionarioModel.js
import { PrismaClient, Funcionario, Prisma } from '@prisma/client';
import FuncionarioDTO from '../dtos/funcionarioDTO';
import prisma from './prismaClient';

export class FuncionarioModel{

  async createFuncionario(funcionarioData: FuncionarioDTO){
    try {
      return await prisma.funcionario.create({
        data: {
          nome: funcionarioData.nome,
          cpf: funcionarioData.cpf,
          telefone: funcionarioData.telefone,
          logradouro: funcionarioData.logradouro,
          numero: funcionarioData.numero,
          complemento: funcionarioData.complemento,
          bairro: funcionarioData.bairro,
          cidade: funcionarioData.cidade,
          cep: funcionarioData.cep
        }
      });
    } catch (error: unknown) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002' && error.meta && typeof error.meta.target === 'string' && error.meta.target.includes('cpf')) {
          throw new Error('CPF já está em uso.');
        }
      }
      throw error;
    }
  }
  
  async getTotalFuncionarios(){
    return await prisma.funcionario.count({
      where: {
        visivel: true
      }
    });
  }

  async getFuncionarios(){
    try {
      return prisma.funcionario.findMany({
        where: {visivel: true},
        include: {servicos: {}}, 
        orderBy: {cpf: 'asc'}
      });
    } catch (error: unknown) {
      throw error;
    }
  }

  async getFuncionariosPage(page: number, pageSize: number) {
    const skip = (page - 1) * pageSize; // Calcula quantos registros pular baseado na página atual
    const take = pageSize; // Quantos registros retornar

    try {
        return prisma.funcionario.findMany({
            where: { visivel: true },
            orderBy: { nome: 'asc' },
            skip: skip,
            take: take,
        });
    } catch (error: unknown) {  
        throw error;
    }
  }

  async getFuncionarioById(id: any){
    try {
      return prisma.funcionario.findUnique({
        where: {
           id,
           visivel: true 
          }, 
        include: {servicos: {}}
      });
    } catch (error: unknown) {
      throw error;
    }
  }

  async getFuncionarioByName(name: string) {
    try {
      return await prisma.funcionario.findMany({
        where: {
          nome: {
            contains: name,
          },
          visivel: true
        },
      });
    } catch (error: unknown) {
      throw error;
    }
  } 

  async updateFuncionarioById(id: any, funcionarioData: Partial<Funcionario>) {
    try {
      const updatedFuncionario = await prisma.funcionario.update({
        where: { id },
        data: {
          nome: funcionarioData.nome,
          cpf: funcionarioData.cpf,
          telefone: funcionarioData.telefone,
          logradouro: funcionarioData.logradouro,
          numero: funcionarioData.numero,
          complemento: funcionarioData.complemento,
          bairro: funcionarioData.bairro,
          cidade: funcionarioData.cidade,
          cep: funcionarioData.cep
        },
      });
      return updatedFuncionario;
    } catch (error: unknown) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new Error('Funcionario não encontrado.');
        }
        else if (error.code === 'P2002' && error.meta && typeof error.meta.target === 'string' && error.meta.target.includes('cpf')) {
          throw new Error('CPF já está em uso.');
        }
      }
      throw error;
    }
  }

  async deleteFuncionarioById(id: any) {
    try {
      await prisma.funcionario.update({
        where: { id },
        data: {visivel: false}
      });
    } catch (error: unknown) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new Error('Funcionario não encontrado.');
        }
      }
      throw error;
    }
  }
}

