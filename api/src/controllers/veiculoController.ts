// src/controllers/veiculoController.js
import { Request, Response } from 'express';
import {VeiculoService} from '../services/veiculoService';
import VeiculoDto from '../dtos/veiculoDTO';
const veiculoService = new VeiculoService()
export class VeiculoController{

  async createVeiculo(req: Request, res: Response){
    try {
      const veiculoData: VeiculoDto = new VeiculoDto(req.body);
      const novoVeiculo = await veiculoService.createVeiculo(veiculoData);
      return res.status(201).json(novoVeiculo);
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      }
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async getVeiculos(req: Request, res: Response){
    try {
      const veiculos = await veiculoService.getVeiculos();
      return res.status(200).json(veiculos);
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      }
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async getVeiculoById(req: Request, res: Response){
    try {
      const { id } = req.params;
      const veiculo = await veiculoService.getVeiculoById(id);
      return res.status(200).json(veiculo);
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      }
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async getVeiculoByIdCliente(req: Request, res: Response){
    try {
      const { idCliente } = req.params;
      const veiculo = await veiculoService.getVeiculoByIdCliente(idCliente);
      return res.status(200).json(veiculo);
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      }
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async getVeiculoByPlaca(req: Request, res: Response){
    try {
      const { placa } = req.params;
      const veiculo = await veiculoService.getVeiculoByPlaca(placa);
      return res.status(200).json(veiculo);
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  async getVeiculosPageByName(req: Request, res: Response){
    try {
      const name = req.params.name;
      const page = parseInt(req.params.page, 10);
      const pageSize = parseInt(req.params.pageSize, 10);
      const veiculos = await veiculoService.getVeiculoPageByName(name, page, pageSize);
      const total = await veiculoService.getTotalVeiculosName(name);
      return res.status(200).json({ veiculos, total });
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  async getVeiculosIdPage(req: Request, res: Response){
    try {
      const id = req.params.id;
      const page = parseInt(req.params.page, 10);
      const pageSize = parseInt(req.params.pageSize, 10);
      if (isNaN(page) || isNaN(pageSize)) {
        return res.status(400).send({ error: 'Os parâmetros page e pageSize devem ser números válidos.' });
      }
      const veiculos = await veiculoService.getVeiculosIdPage(page, pageSize, id);
      const total = await veiculoService.getTotalVeiculosId(id);
      return res.status(200).json({ veiculos, total });
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  async getVeiculosPage(req: Request, res: Response){
    try {
      const page = parseInt(req.params.page, 10);
      const pageSize = parseInt(req.params.pageSize, 10);
      if (isNaN(page) || isNaN(pageSize)) {
        return res.status(400).send({ error: 'Os parâmetros page e pageSize devem ser números válidos.' });
      }
      const veiculos = await veiculoService.getVeiculosPage(page, pageSize);
      const total = await veiculoService.getTotalVeiculos();
      return res.status(200).json({ veiculos, total });
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  async updateVeiculoById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      //const veiculoData: VeiculoDto = req.body;
      const veiculoData: VeiculoDto = new VeiculoDto(req.body); // Cria um novo VeiculoDto com os dados recebidos
      //const { clienteId, tipo, modelo, marca, placa, cor, ano } = req.body;
     
      const veiculoAtualizado = await veiculoService.updateVeiculoById(id, veiculoData);
      //const veiculoAtualizado = await veiculoService.updateVeiculoById(id, { clienteId, tipo, modelo, marca, placa, cor, ano });
      return res.status(200).json(veiculoAtualizado);
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      }
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async deleteVeiculoById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await veiculoService.deleteVeiculoById(id);
      return res.status(204).send();
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      }
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }

};
