// src/controllers/clienteController.js
import { Request, Response } from 'express';
import {ClienteService} from '../services/clienteService';
import ClienteDTO from '../dtos/clienteDTO';

const clienteService = new ClienteService();

export class ClienteController{

  async createCliente(req: Request, res: Response){
    try {
      const clienteData: ClienteDTO = new ClienteDTO(req.body);
      const novoCliente = await clienteService.createCliente(clienteData);
      return res.status(201).json(novoCliente);
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  async getClientes(req: Request, res: Response){
    try {
      const clientes = await clienteService.getClientes();
      return res.status(200).json(clientes);
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  async getClienteById(req: Request, res: Response){
    try {
      const { id } = req.params;
      const cliente = await clienteService.getClienteById(id);
      return res.status(200).json(cliente);
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  async getClienteByName(req: Request, res: Response){
    try {
      const { name } = req.params;
      const cliente = await clienteService.getClienteByName(name);
      return res.status(200).json(cliente);
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  async getClientesPageByName(req: Request, res: Response){
    try {
      const name = req.params.name;
      const page = parseInt(req.params.page, 10);
      const pageSize = parseInt(req.params.pageSize, 10);
      const clientes = await clienteService.getClientePageByName(name, page, pageSize);
      const total = await clienteService.getTotalClientesName(name);
      return res.status(200).json({ clientes, total });
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  async getClientesPage(req: Request, res: Response){
    try {
      const page = parseInt(req.params.page, 10);
      const pageSize = parseInt(req.params.pageSize, 10);
      if (isNaN(page) || isNaN(pageSize)) {
        return res.status(400).send({ error: 'Os parâmetros page e pageSize devem ser números válidos.' });
      }
      const clientes = await clienteService.getClientesPage(page, pageSize);
      const total = await clienteService.getTotalClientes();
      return res.status(200).json({ clientes, total });
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  async updateClienteById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const clienteData : ClienteDTO = new ClienteDTO(req.body);
      const clienteAtualizado = await clienteService.updateClienteById(id, clienteData);
      return res.status(200).json(clienteAtualizado);
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  async deleteClienteById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await clienteService.deleteClienteById(id);
      return res.status(204).send();
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }

};
