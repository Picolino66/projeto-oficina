// src/services/funcionarioService.js
import {FuncionarioModel} from '../models/funcionarioModel';
import { Funcionario } from '@prisma/client'
const funcionarioModel = new FuncionarioModel()
export class FuncionarioService{
  
  async createFuncionario(data: any){
    try {
      return funcionarioModel.createFuncionario(data);
    } catch (error: unknown) {
      throw error;
    }
  }

  async getTotalFuncionarios(){
    try {
      return funcionarioModel.getTotalFuncionarios();
    } catch (error: unknown) {
      throw error;
    }
  }

  async getFuncionarios(){
    try {
      return funcionarioModel.getFuncionarios();
    } catch (error: unknown) {
      throw error;
    }
  }

  async getFuncionarioById(id: any){
    try {
      return funcionarioModel.getFuncionarioById(id);
    } catch (error: unknown) {
      throw error;
    }
  }

  async getFuncionarioByName(name: any){
    try {
      return funcionarioModel.getFuncionarioByName(name);
    } catch (error: unknown) {
      throw error;
    }
  }
  
  async getFuncionariosPage(page: number, pageSize: number){
    try {
      return funcionarioModel.getFuncionariosPage(page, pageSize);
    } catch (error: unknown) {
      throw error;
    }
  }

  async updateFuncionarioById(id: any, funcionario: Partial<Funcionario>) {
    try {
      return funcionarioModel.updateFuncionarioById(id, funcionario);
    } catch (error: unknown) {
      throw error;
    }
  }

  async deleteFuncionarioById(id: any) {
    try {
      return funcionarioModel.deleteFuncionarioById(id);
    } catch (error: unknown) {
      throw error;
    }
  }

}
