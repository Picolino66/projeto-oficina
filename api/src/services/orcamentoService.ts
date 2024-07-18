// src/services/orcamentoService.js
import {OrcamentoModel} from '../models/orcamentoModel';
import { Orcamento } from '@prisma/client'
const orcamentoModel = new OrcamentoModel()
export class OrcamentoService{
  
  async createOrcamento(data: any){
    try {
      return orcamentoModel.createOrcamento(data);
    } catch (error: unknown) {
      throw error;
    }
  }

  async getOrcamentos(){
    try {
      return orcamentoModel.getOrcamentos();
    } catch (error: unknown) {
      throw error;
    }
  }

  async getOrcamentoById(id: any){
    try {
      return orcamentoModel.getOrcamentoById(id);
    } catch (error: unknown) {
      throw error;
    }
  }

  async updateOrcamentoById(id: any, orcamento: Partial<Orcamento>) {
    try {
      return orcamentoModel.updateOrcamentoById(id, orcamento);
    } catch (error: unknown) {
      throw error;
    }
  }

  async deleteOrcamentoById(id: any) {
    try {
      return orcamentoModel.deleteOrcamentoById(id);
    } catch (error: unknown) {
      throw error;
    }
  }
}
