// src/services/clienteService.js
import {ClienteModel} from '../models/clienteModel';
import { Cliente } from '@prisma/client';
import { VeiculoModel } from '../models/veiculoModel';

const clienteModel = new ClienteModel();
const veiculoModel = new VeiculoModel();
export class ClienteService{
  
  async createCliente(data: any){
    try {
      return clienteModel.createCliente(data);
    } catch (error: unknown) {
      throw error;
    }
  }

  async getTotalClientes(){
    try {
      return clienteModel.getTotalClientes();
    } catch (error: unknown) {
      throw error;
    }
  }

  async getClientes(){
    try {
      return clienteModel.getClientes();
    } catch (error: unknown) {
      throw error;
    }
  }

  async getClienteById(id: any){
    try {
      return clienteModel.getClienteById(id);
    } catch (error: unknown) {
      throw error;
    }
  }

  async getClienteByName(name: any){
    try {
      return clienteModel.getClientesByName(name);
    } catch (error: unknown) {
      throw error;
    }
  }

  async getTotalClientesName(name: any){
    try {
      return clienteModel.getTotalClientesName(name);
    } catch (error: unknown) {
      throw error;
    }
  }

  async getClientePageByName(name: any, page: number, pageSize: number){
    try {
      return clienteModel.getClientesPageByName(name, page, pageSize);
    } catch (error: unknown) {
      throw error;
    }
  }
  
  async getClientesPage(page: number, pageSize: number){
    try {
      return clienteModel.getClientesPage(page, pageSize);
    } catch (error: unknown) {
      throw error;
    }
  }

  async updateClienteById(id: any, cliente: Partial<Cliente>) {
    try {
      return clienteModel.updateClienteById(id, cliente);
    }
    catch (error: unknown) {
      throw error;
    }
  }

  async deleteClienteById(id: any) {
    try { 
      await veiculoModel.deleteVeiculoByClienteId(id);
      await clienteModel.deleteClienteById(id);
    }
    catch (error: unknown) {
      throw error;
    }
  }
}
