// src/models/veiculoModel.js
import { PrismaClient, Veiculo, Prisma } from '@prisma/client';
import VeiculoDto from '../dtos/veiculoDTO';
import prisma from './prismaClient';

export class VeiculoModel{

  async createVeiculo(veiculoData: VeiculoDto){
    try {
      return await prisma.veiculo.create({
        data: {
          clienteId: veiculoData.clienteId,
          tipo: veiculoData.tipo,
          modelo: veiculoData.modelo,
          marca: veiculoData.marca,
          placa: veiculoData.placa,
          cor: veiculoData.cor,
          ano: veiculoData.ano,
        }
      });
    } catch (error: unknown) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2003' && error.meta && error.meta.field_name === 'clienteId') {
          throw new Error('Cliente não encontrado.');
        }
      }
      throw error;
    }
  }

  async getVeiculosPageByName(nome: string, page: number, pageSize: number) {
    const skip = (page - 1) * pageSize; // Calcula quantos registros pular baseado na página atual
    const take = pageSize; // Quantos registros retornar
  
    try {
      return await prisma.veiculo.findMany({
        where: {
          visivel: true,
          cliente: {
            nome: {
              contains: nome,
            }
          }
        },
        include: {
          servicos: {},
          cliente: {}
        },
        orderBy: {
          cliente: {
            nome: 'asc'
          }
        },
        skip: skip,
        take: take,
      });
    } catch (error: unknown) {
      throw error;
    }
  }
  
  async getTotalVeiculos(){
    return await prisma.veiculo.count({
      where: {
        visivel: true
      }
    });
  }
  async getTotalVeiculosId(id: string){
    return await prisma.veiculo.count({
      where: {
        visivel: true,
        cliente: {
          id: id
        }
      }
    });
  }
  async getTotalVeiculosNome(nome: string){
    return await prisma.veiculo.count({
      where: {
        visivel: true,
        cliente: {
          nome: {
            contains: nome,
          }
        }
      }
    });
  }

  async getVeiculos(){
    try {
      return prisma.veiculo.findMany({
        where: { 
          visivel: true 
        },
        include: {
          servicos: {},
          cliente: {}
        }, 
        orderBy: 
        {
          modelo: 'asc'
        }
      });
    } catch (error: unknown) {
      throw error;
    }
  }

  async getVeiculosPage(page: number, pageSize: number) {
    const skip = (page - 1) * pageSize; // Calcula quantos registros pular baseado na página atual
    const take = pageSize; // Quantos registros retornar

    try {
        return prisma.veiculo.findMany({
          where: {
            visivel: true
          },
          include: {
            servicos: {},
            cliente: {}
          }, 
            orderBy: { 
              cliente: { 
                nome: 'asc' 
              } 
            },
            skip: skip,
            take: take,
        });
    } catch (error: unknown) {  
        throw error;
    }
  }

  async getVeiculosIdPage(page: number, pageSize: number, id: string) {
    const skip = (page - 1) * pageSize; // Calcula quantos registros pular baseado na página atual
    const take = pageSize; // Quantos registros retornar
    try {
        return prisma.veiculo.findMany({
          where: {
            visivel: true,
            clienteId: id
          },
          include: {
            servicos: {},
            cliente: {}
          }, 
            orderBy: { placa: 'asc' },
            skip: skip,
            take: take,
        });
    } catch (error: unknown) {  
        throw error;
    }
  }

  async getVeiculoById(id: any){
    try {
      return prisma.veiculo.findUnique({
        where: { 
          id, 
          visivel: true
        },
        include: {
          servicos: {},
          cliente: {}
        }
      });
    } catch (error: unknown) {
      throw error;
    }
  }

  async getVeiculoByIdCliente(id: any){
    try {
      return prisma.veiculo.findMany({
        include: {
          servicos: {},
          cliente: {}
        },
        where: {
          cliente: {
            id: {
              contains: id,
            },
          },
          visivel: true
        }
      });
    } catch (error: unknown) {
      throw error;
    }
  }

  async getVeiculoByPlaca(nome: string) {
    try {
      return await prisma.veiculo.findMany({
        include: {
          servicos: {},
          cliente: {}
        },
        where: {
          cliente: {
            nome: {
              contains: nome,
            },
          },
          visivel: true
        },
      });
    } catch (error: unknown) {
      throw error;
    }
  } 

  async updateVeiculoById(id: any, veiculoData: Partial<Veiculo>) {
    try {
      return await prisma.veiculo.update({
        where: { id },
        data: {
          clienteId: veiculoData.clienteId,
          tipo: veiculoData.tipo,
          modelo: veiculoData.modelo,
          marca: veiculoData.marca,
          placa: veiculoData.placa,
          cor: veiculoData.cor,
          ano: veiculoData.ano,
        },
      });
    } catch (error: unknown) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new Error('Veiculo não encontrado.');
        }
      }
      throw error;
    }
  }

  async deleteVeiculoById(id: any) {
    try {
      await prisma.veiculo.update({ 
        where: { id },
        data: {visivel: false}
      });
    } catch (error: unknown) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new Error('Veiculo não encontrado.');
        }
      }
      throw error;
    }
  }

  //deletar veiculos por cliente
  async deleteVeiculoByClienteId(id: any) {
    try {
      await prisma.veiculo.updateMany({ 
        where: { clienteId: id },
        data: { visivel: false }
      });
    } catch (error: unknown) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new Error('Veiculo não encontrado.');
        }
      }
      throw error;
    }
  }

}
