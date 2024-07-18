// src/models/clienteModel.js
import { PrismaClient, Cliente, Prisma } from '@prisma/client';
import ClienteDTO from '../dtos/clienteDTO';
import e from 'express';
import prisma from './prismaClient';

//const prisma = new PrismaClient();

export class ClienteModel {

  async createCliente(clienteData: ClienteDTO) {
    try {
      return await prisma.cliente.create({
        data: {
          nome: clienteData.nome,
          cpf: clienteData.cpf,
          telefone: clienteData.telefone,
          logradouro: clienteData.logradouro,
          numero: clienteData.numero,
          complemento: clienteData.complemento,
          bairro: clienteData.bairro,
          cidade: clienteData.cidade,
          cep: clienteData.cep
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

  async getTotalClientes() {
    return await prisma.cliente.count({
      where: {
        visivel: true
      }
    });
  }

  async getTotalClientesName(name: string) {
    return await prisma.cliente.count({
      where: {
        nome: {
          contains: name,
        },
        visivel: true
      }
    });
  }

  async getClientes() {
    try {
      return prisma.cliente.findMany({ 
        where: {
          visivel: true
        },
        orderBy: { cpf: 'asc' }, 
        include: {
          veiculos: {}, 
          servicos: {}
        } 
      });
    } catch (error: unknown) {
      throw error;
    }
  }

  async getClientesPageByName(name: string, page: number, pageSize: number) {
    const skip = (page - 1) * pageSize; // Calcula quantos registros pular baseado na página atual
    const take = pageSize; // Quantos registros retornar
    try {
      return await prisma.cliente.findMany({
        where: {
          nome: {
            contains: name,
          },
          visivel: true
        }, 
        orderBy: { nome: 'asc' },
        include: {
          veiculos: {}, 
          servicos: {}
        },
        skip: skip,
        take: take,
      });
    } catch (error: unknown) {
      throw error;
    }
  }

  async getClientesPage(page: number, pageSize: number) {
    const skip = (page - 1) * pageSize; // Calcula quantos registros pular baseado na página atual
    const take = pageSize; // Quantos registros retornar

    try {
      return prisma.cliente.findMany({
        where: {
          visivel: true
        },
        orderBy: { nome: 'asc' },
        include: {
          veiculos: {},
          servicos: {}
        },
        skip: skip,
        take: take,
      });
    } catch (error: unknown) {
      throw error;
    }
  }

  async getClienteById(id: any) {
    try {
      return await prisma.cliente.findUnique({
        where: {
          id,
          visivel: true
        },
        include: {
          veiculos: {},
          servicos: {}
        }
      });
    } catch (error: unknown) {
      throw error;
    }
  }

  async getClientesByName(name: string) {
    try {
      return await prisma.cliente.findMany({
        where: {
          nome: {
            contains: name,
          },
          visivel: true
        }, 
        include: {
          veiculos: {}, 
          servicos: {}
        }
      });
    } catch (error: unknown) {
      throw error;
    }
  }

  async updateClienteById(id: any, clienteData: Partial<Cliente>) {
    try {
      const updatedCliente = await prisma.cliente.update({
        where: { id },
        data: {
          nome: clienteData.nome,
          cpf: clienteData.cpf,
          telefone: clienteData.telefone,
          logradouro: clienteData.logradouro,
          numero: clienteData.numero,
          complemento: clienteData.complemento,
          bairro: clienteData.bairro,
          cidade: clienteData.cidade,
          cep: clienteData.cep
        },
      });
      return updatedCliente;
    } catch (error: unknown) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new Error('Cliente não encontrado.');
        }
        else if (error.code === 'P2002' && error.meta && typeof error.meta.target === 'string' && error.meta.target.includes('cpf')) {
          throw new Error('CPF já está em uso.');
        }
      }
      throw error;
    }
  }

  async deleteClienteById(id: any) {
    try {
      await prisma.cliente.update({ 
        where: { id },
        data: {visivel: false}
      });
    } catch (error: unknown) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new Error('Cliente não encontrado.');
        }
      }
      throw error;
    }
  }

}

