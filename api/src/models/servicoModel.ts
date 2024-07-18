// src/models/servicoModel.js
import { PrismaClient, Servico, Prisma } from '@prisma/client';
import ServicoDTO from '../dtos/servicoDTO';
import prisma from './prismaClient';
export class ServicoModel {

  async createServico(servicoData: ServicoDTO) {
    try {
      return await prisma.servico.create({
        data: {
          clienteId: servicoData.clienteId,
          veiculoId: servicoData.veiculoId,
          placa: servicoData.placa,
          km: servicoData.km,
          nome: servicoData.nome,
          preco: servicoData.preco,
          pagamento: 0,
          //dataInicio: new Date(servicoData.dataInicio).toISOString(),
          descricao: servicoData.descricao
        }
      });
    } catch (error: unknown) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2003' && error.meta && error.meta.field_name === 'clienteId') {
          throw new Error('Cliente não encontrado.');
        }
        else if (error.code === 'P2003' && error.meta && error.meta.field_name === 'veiculoId') {
          throw new Error('Veículo não encontrado.');
        }
      }
      throw error;
    }
  }

  async getTotalServicos(filtroPagamento: number) {
    // Inicializa o objeto where com base no filtroPagamento
    let where: { visivel: boolean; pagouTudo?: boolean } = { visivel: true };
  
    if (filtroPagamento === 2) {
      where.pagouTudo = true;
    } else if (filtroPagamento === 3) {
      where.pagouTudo = false;
    }
  
    return await prisma.servico.count({
      where: where
    });
  }

  async getTotalServicosId(id: string){
    return await prisma.servico.count({
      where: {
        visivel: true,
        cliente: {
          id: id
        }
      }
    });
  }

  async getServicos() {
    try {
      return prisma.servico.findMany({
        where: { visivel: true },
        include: { funcionario: {} }, 
        orderBy: { nome: 'asc' } 
      });
    } catch (error: unknown) {
      throw error;
    }
  }

  async getServicosPage(page: number, pageSize: number, filtroPagamento: number) {
    const skip = (page - 1) * pageSize;
    const take = pageSize;

    // Inicializa o objeto where com base no filtroPagamento
    let where = {} as any;

    if (filtroPagamento === 2) {
      where.pagouTudo = true;
    } else if (filtroPagamento === 3) {
      where.pagouTudo = false;
    }
    try {
      return prisma.servico.findMany({
        where: {
          visivel: true,
          ...where
        },
        include: {
          funcionario: {},
          cliente: {},
          veiculo: {}
        },
        orderBy: { dataInicio: 'desc' },
        skip: skip,
        take: take,
      });
    } catch (error: unknown) {
      throw error;
    }
  }

  async getTotalServicosNome(filtroPagamento: number, proprietario: string) {
    // Inicializa o objeto where com base no filtroPagamento
    let where = {
      cliente: {
        nome: {
          contains: proprietario,
        }
      },
      visivel: true
    } as any;
  
    if (filtroPagamento === 2) {
      where.pagouTudo = true;
    } else if (filtroPagamento === 3) {
      where.pagouTudo = false;
    }
  
    return await prisma.servico.count({
      where: where
    });
  }

  async getServicosPageByProprietario(page: number, pageSize: number, filtroPagamento: number, proprietario: string) {
    const skip = (page - 1) * pageSize;
    const take = pageSize;

    // Inicializa o objeto where com base no filtroPagamento
    let where = {
      cliente: {
        nome: {
          contains: proprietario,
        }
      }
    } as any;

    if (filtroPagamento === 2) {
      where.pagouTudo = true;
    } else if (filtroPagamento === 3) {
      where.pagouTudo = false;
    }
    try {
      return prisma.servico.findMany({
        where: {
          visivel: true,
          ...where
        },
        include: {
          funcionario: {},
          cliente: {},
          veiculo: {}
        },
        orderBy: { dataInicio: 'desc' },
        skip: skip,
        take: take,
      });
    } catch (error: unknown) {
      throw error;
    }
  }

  async getServicosIdPage(page: number, pageSize: number, id: string) {
    const skip = (page - 1) * pageSize; // Calcula quantos registros pular baseado na página atual
    const take = pageSize; // Quantos registros retornar
    try {
        return prisma.servico.findMany({
          where: {
            visivel: true,
            clienteId: id
          },
          include: {
            cliente: {},
            veiculo: {} 
          }, 
            orderBy: { dataInicio: 'asc' },
            skip: skip,
            take: take,
        });
    } catch (error: unknown) {  
        throw error;
    }
  }

  async getServicoById(id: any) {
    try {
      return prisma.servico.findUnique({
        where: {
            id,
            visivel: true
          }, 
      });
    } catch (error: unknown) {
      throw error;
    }
  }

  async getServicoCompletoById(id: any) {
    try {
      return prisma.servico.findUnique({ 
        where: {
          id,
          visivel: true
        }, 
        include: { 
          cliente: {}, 
          veiculo: {} 
        } 
      });
    } catch (error: unknown) {
      throw error;
    }
  }

  async getServicoCompletoByIdCliente(id: string) {
    try {
      return prisma.servico.findMany({ 
        where: { 
          clienteId: id,
          visivel: true
        }, 
        include: {
          cliente: {}, 
          veiculo: {} 
          } 
      });
    } catch (error: unknown) {
      throw error;
    }
  }

  async getServicoByPlaca(placa: string) {
    try {
      return await prisma.servico.findMany({
        include: {
          funcionario: {},
          cliente: {},
          veiculo: {}
        },
        where: {
          placa: {
            contains: placa,
          },
          visivel: true
        },
      });
    } catch (error: unknown) {
      throw error;
    }
  }

  async updateServicoById(id: any, servicoData: ServicoDTO) {
    try {
      return await prisma.servico.update({
        where: { id },
        data: {
          clienteId: servicoData.clienteId,
          veiculoId: servicoData.veiculoId,
          placa: servicoData.placa,
          km: servicoData.km,
          nome: servicoData.nome,
          preco: servicoData.preco,
          pagamento: servicoData.pagamento,
          dataPrevista: servicoData.pagamento >= servicoData.preco ? new Date().toISOString() : servicoData.dataPrevista,
          //dataPrevista: servicoData.dataPrevista,
          descricao: servicoData.descricao,
          pagouTudo: servicoData.pagamento >= servicoData.preco ? true : false
        },
      });
    } catch (error: unknown) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new Error('Serviço não encontrado.');
        }
      }
      throw error;
    }
  }

  async deleteServicoById(id: any) {
    try {
      await prisma.servico.update({ 
        where: { id },
        data: { visivel: false }
      });
    } catch (error: unknown) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new Error('Serviço não encontrado.');
        }
      }
      throw error;
    }
  }
  
  async getTotalServicosAnoAtual() {
    const agora = new Date();
    const primeiroDiaAno = new Date(agora.getFullYear(), 0, 1);
    const ultimoDiaAno = new Date(agora.getFullYear(), 11, 31);
  
    return await prisma.servico.count({
      where: {
        visivel: true,
        dataInicio: {
          gte: primeiroDiaAno,
          lte: ultimoDiaAno
        }
      }
    });
  }
  
  async getTotalServicosMesAtual() {
    const agora = new Date();
    const primeiroDiaMes = new Date(agora.getFullYear(), agora.getMonth(), 1);
    const ultimoDiaMes = new Date(agora.getFullYear(), agora.getMonth() + 1, 0);
  
    return await prisma.servico.count({
      where: {
        visivel: true,
        dataInicio: {
          gte: primeiroDiaMes,
          lte: ultimoDiaMes
        }
      }
    });
  }
  
  async getTotalServicosDiaAtual() {
    const agora = new Date();
    const inicioDoDia = new Date(agora.setHours(0, 0, 0, 0));
    const fimDoDia = new Date(agora.setHours(23, 59, 59, 999));
  
    return await prisma.servico.count({
      where: {
        visivel: true,
        dataInicio: {
          gte: inicioDoDia,
          lte: fimDoDia
        }
      }
    });
  }
  
  async getTotalDinheiroServicosMesAtual() {
    const agora = new Date();
    const primeiroDiaMes = new Date(agora.getFullYear(), agora.getMonth(), 1);
    const ultimoDiaMes = new Date(agora.getFullYear(), agora.getMonth() + 1, 0);

    const resultado = await prisma.servico.aggregate({
      where: {
        visivel: true,
        dataInicio: {
          gte: primeiroDiaMes,
          lte: ultimoDiaMes
        }
      },
      _sum: {
        preco: true
      }
    });

    return resultado._sum.preco;
  }

}
