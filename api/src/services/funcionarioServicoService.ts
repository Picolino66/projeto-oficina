// src/services/funcionarioServicoService.js
import {FuncionarioServicoModel} from '../models/funcionarioServicoModel';
import { FuncionarioServico } from '@prisma/client'
const funcionarioServicoModel = new FuncionarioServicoModel()
export class FuncionarioServicoService{
  
  async createFuncionarioServico(data: any){
    try {
      return funcionarioServicoModel.createFuncionarioServico(data);
    } catch (error: unknown) {
      throw error;
    }
  }

  async getFuncionarioServicos(){
    try {
      return funcionarioServicoModel.getFuncionarioServicos();
    } catch (error: unknown) {
      throw error;
    }
  }

  async getFuncionarioById(funcionarioId: any){
    try {
      return funcionarioServicoModel.getFuncionarioById(funcionarioId);
    } catch (error: unknown) {
      throw error;
    }
  }

  async getFuncionarioServicoById(funcionarioId: any, servicoId: any){
    try {
      return funcionarioServicoModel.getFuncionarioServicoById(funcionarioId, servicoId);
    } catch (error: unknown) {
      throw error;
    }
  }

  async updateFuncionarioServicoById(funcionarioId: any, servicoId: any, funcionarioServico: Partial<FuncionarioServico>) {
    try {
      return funcionarioServicoModel.updateFuncionarioServicoById(funcionarioId, servicoId, funcionarioServico);
    } catch (error: unknown) {
      throw error;
    }
  }

  async deleteFuncionarioServicoById(funcionarioId: any, servicoId: any) {
    try {
      return funcionarioServicoModel.deleteFuncionarioServicoById(funcionarioId, servicoId);
    } catch (error: unknown) {
      throw error;
    }
  }
  
  async getServicosPageByFuncionario(page: number, pageSize: number, funcionarioId: string){
    try {
      return funcionarioServicoModel.getServicosPageByFuncionario(page, pageSize, funcionarioId);
    } catch (error: unknown) {
      throw error;
    }
  }

  async getTotalServicosByFuncionario(funcionarioId: string){
    try {
      return await funcionarioServicoModel.getTotalServicosByFuncionario(funcionarioId);
    } catch (error: unknown) {
      throw error;
    }
  }
  
}
