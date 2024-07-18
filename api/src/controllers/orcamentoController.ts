// src/controllers/orcamentoController.js
import { Request, Response } from 'express';
import {OrcamentoService} from '../services/orcamentoService';
import OrcamentoDto from '../dtos/orcamentoDTO';

const orcamentoService = new OrcamentoService()
export class OrcamentoController{

  async createOrcamento(req: Request, res: Response){
    try {
      const orcamentoData: OrcamentoDto = new OrcamentoDto(req.body);
      const novoOrcamento = await orcamentoService.createOrcamento(orcamentoData);
      return res.status(201).json(novoOrcamento);
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  async getOrcamentos(req: Request, res: Response){
    try {
      const orcamentos = await orcamentoService.getOrcamentos();
      return res.status(200).json(orcamentos);
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  async getOrcamentoById(req: Request, res: Response){
    try {
      const { id } = req.params;
      const orcamento = await orcamentoService.getOrcamentoById(id);
      return res.status(200).json(orcamento);
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  async updateOrcamentoById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const orcamentoData: OrcamentoDto = new OrcamentoDto(req.body);
      const orcamentoAtualizado = await orcamentoService.updateOrcamentoById(id, orcamentoData);
      return res.status(200).json(orcamentoAtualizado);
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  async deleteOrcamentoById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await orcamentoService.deleteOrcamentoById(id);
      return res.status(204).send();
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }

};