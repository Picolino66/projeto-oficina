// src/controllers/funcionarioServicoController.js
import { Request, Response } from 'express';
import { FuncionarioServicoService } from '../services/funcionarioServicoService';
import FuncionarioServicoDTO from '../dtos/funcionarioServicoDTO';

const funcionarioServicoService = new FuncionarioServicoService()
export class FuncionarioServicoController {

  async createFuncionarioServico(req: Request, res: Response) {
    try {
      const funcionarioServicoData: FuncionarioServicoDTO = new FuncionarioServicoDTO(req.body);
      const novoFuncionarioServico = await funcionarioServicoService.createFuncionarioServico(funcionarioServicoData);
      return res.status(201).json(novoFuncionarioServico);
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      }
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async getFuncionarioServicos(req: Request, res: Response) {
    try {
      const funcionarioServicos = await funcionarioServicoService.getFuncionarioServicos();
      return res.status(200).json(funcionarioServicos);
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      }
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async getFuncionarioById(req: Request, res: Response) {
    try {
      const { funcionarioId } = req.params;
      const funcionarioServico = await funcionarioServicoService.getFuncionarioById(funcionarioId);
      return res.status(200).json(funcionarioServico);
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      }
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async getFuncionarioServicoById(req: Request, res: Response) {
    try {
      const { funcionarioId, servicoId } = req.params;
      const funcionarioServico = await funcionarioServicoService.getFuncionarioServicoById(funcionarioId, servicoId);
      return res.status(200).json(funcionarioServico);
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      }
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async updateFuncionarioServicoById(req: Request, res: Response) {
    try {
      const { funcionarioId, servicoId } = req.params;
      const funcionarioServicoData: FuncionarioServicoDTO = new FuncionarioServicoDTO(req.body);
      const funcionarioServicoAtualizado = await funcionarioServicoService.updateFuncionarioServicoById(funcionarioId, servicoId, funcionarioServicoData);
      return res.status(200).json(funcionarioServicoAtualizado);
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      }
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async deleteFuncionarioServicoById(req: Request, res: Response) {
    try {
      const { funcionarioId, servicoId } = req.params;
      await funcionarioServicoService.deleteFuncionarioServicoById(funcionarioId, servicoId);
      return res.status(204).send();
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      }
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async getServicosPageByFuncionario(req: Request, res: Response){
    try {
      const page = parseInt(req.params.page, 10);
      const pageSize = parseInt(req.params.pageSize, 10);
      const funcionarioId = req.params.funcionarioId;
      if (isNaN(page) || isNaN(pageSize)) {
        return res.status(400).send({ error: 'Os parâmetros page e pageSize devem ser números válidos.' });
      }
      const servicos = await funcionarioServicoService.getServicosPageByFuncionario(page, pageSize, funcionarioId);
      const total = await funcionarioServicoService.getTotalServicosByFuncionario(funcionarioId);
      return res.status(200).json({ servicos, total });
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }

};
