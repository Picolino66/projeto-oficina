// src/services/veiculoService.js
import {VeiculoModel} from '../models/veiculoModel';
import { Veiculo } from '@prisma/client'
const veiculoModel = new VeiculoModel()
export class VeiculoService{
  
  async createVeiculo(data: any){
    try {
      return veiculoModel.createVeiculo(data);
    } catch (error: unknown) {
      throw error;
    }
  }

  async getVeiculoPageByName(name: any, page: number, pageSize: number){
    try {
      return veiculoModel.getVeiculosPageByName(name, page, pageSize);
    } catch (error: unknown) {
      throw error;
    }
  }

  async getTotalVeiculos(){
    try {
      return veiculoModel.getTotalVeiculos();
    } catch (error: unknown) {
      throw error;
    }
  }

  async getTotalVeiculosId(id: string){
    try {
      return veiculoModel.getTotalVeiculosId(id);
    } catch (error: unknown) {
      throw error;
    }
  }

  async getTotalVeiculosName(name: string){
    try {
      return await veiculoModel.getTotalVeiculosNome(name);
    } catch (error: unknown) {
      throw error;
    }
  }

  async getVeiculos(){
    try {
      return veiculoModel.getVeiculos();
    } catch (error: unknown) {
      throw error;
    }
  }
  async getVeiculoById(id: any){
    try {
      return veiculoModel.getVeiculoById(id);
    } catch (error: unknown) {
      throw error;
    }
  }
  async getVeiculoByIdCliente(id: any){
    try {
      return veiculoModel.getVeiculoByIdCliente(id);
    } catch (error: unknown) {
      throw error;
    }
  }

  async getVeiculoByPlaca(placa: any){
    try {
      return veiculoModel.getVeiculoByPlaca(placa);
    } catch (error: unknown) {
      throw error;
    }
  }
  
  async getVeiculosPage(page: number, pageSize: number){
    try {
      return veiculoModel.getVeiculosPage(page, pageSize);
    } catch (error: unknown) {
      throw error;
    }
  }
  
  async getVeiculosIdPage(page: number, pageSize: number, id: string){
    try {
      return veiculoModel.getVeiculosIdPage(page, pageSize, id);
    } catch (error: unknown) {
      throw error;
    }
  }

  async updateVeiculoById(id: any, veiculo: Partial<Veiculo>) {
    try {
      return veiculoModel.updateVeiculoById(id, veiculo);
    } catch (error: unknown) {
      throw error;
    }
  }
  async deleteVeiculoById(id: any) {
    try {
      return veiculoModel.deleteVeiculoById(id);
    } catch (error: unknown) {
      throw error;
    }
  }
}
