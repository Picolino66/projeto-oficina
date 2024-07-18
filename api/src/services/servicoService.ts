// src/services/servicoService.js
import ServicoDTO from '../dtos/servicoDTO';
import {ServicoModel} from '../models/servicoModel';
import { Servico } from '@prisma/client'
const servicoModel = new ServicoModel()
export class ServicoService{
  
  async createServico(data: any){
    try {
      return servicoModel.createServico(data);
    } catch (error: unknown) {
      throw error;
    }
  }

  async getTotalServicos(filtroPagamento: number){
    try {
      return servicoModel.getTotalServicos(filtroPagamento);
    } catch (error: unknown) {
      throw error;
    }
  }

  async getTotalServicosId(id: string){
    try {
      return servicoModel.getTotalServicosId(id);
    } catch (error: unknown) {
      throw error;
    }
  }

  async getServicos(){
    try {
      return servicoModel.getServicos();
    } catch (error: unknown) {
      throw error;
    }
  }

  async getServicoById(id: any){
    try {
      return servicoModel.getServicoById(id);
    } catch (error: unknown) {
      throw error;
    }
  }

  async getServicoCompletoById(id: any){
    try {
      return servicoModel.getServicoCompletoById(id);
    } catch (error: unknown) {
      throw error;
    }
  }

  async getServicoByPlaca(placa: any){
    try {
      return servicoModel.getServicoByPlaca(placa);
    } catch (error: unknown) {
      throw error;
    }
  }
  
  async getServicosPage(page: number, pageSize: number, filtroPagamento: number){
    try {
      return servicoModel.getServicosPage(page, pageSize, filtroPagamento);
    } catch (error: unknown) {
      throw error;
    }
  }

  async getServicosPageByProprietario(page: number, pageSize: number, filtroPagamento: number, nome: string){
    try {
      return servicoModel.getServicosPageByProprietario(page, pageSize, filtroPagamento, nome);
    } catch (error: unknown) {
      throw error;
    }
  }

  async getTotalServicosByProprietario(filtroPagamento: number, name: string){
    try {
      return await servicoModel.getTotalServicosNome(filtroPagamento, name);
    } catch (error: unknown) {
      throw error;
    }
  }
  
  async getServicosIdPage(page: number, pageSize: number, id: string){
    try {
      return servicoModel.getServicosIdPage(page, pageSize, id);
    } catch (error: unknown) {
      throw error;
    }
  }

  async updateServicoById(id: any, servico: ServicoDTO) {
    try {
      return servicoModel.updateServicoById(id, servico);
    } catch (error: unknown) {
      throw error;
    }
  }

  async deleteServicoById(id: any) {
    try {
      return servicoModel.deleteServicoById(id);
    } catch (error: unknown) {
      throw error;
    }
  }

  async getTotalServicosCalendario() {
    try {
      const totalServicosDia = await servicoModel.getTotalServicosDiaAtual();
      const totalServicosMes = await servicoModel.getTotalServicosMesAtual();
      const totalServicosAno = await servicoModel.getTotalServicosAnoAtual();
      return {totalServicosDia, totalServicosMes, totalServicosAno};
    } catch (error: unknown) {
      throw error;
    }
  }

}
