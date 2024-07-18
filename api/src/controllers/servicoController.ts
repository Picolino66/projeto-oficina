// src/controllers/servicoController.js
import { Request, Response } from 'express';
import {ServicoService} from '../services/servicoService';
import ServicoDTO from '../dtos/servicoDTO';
import { FuncionarioServicoService } from '../services/funcionarioServicoService';
import FuncionarioServicoDTO from '../dtos/funcionarioServicoDTO';
const servicoService = new ServicoService()
const funcionarioServicoService = new FuncionarioServicoService();
export class ServicoController{

  async createServico(req: Request, res: Response){
    try {
      const servicoData: ServicoDTO = new ServicoDTO(req.body);
      const novoServico = await servicoService.createServico(servicoData);
      const comissaoFuncionarios = req.body.comissaoFuncionarios;
      comissaoFuncionarios.forEach(async (element: FuncionarioServicoDTO) => {
        let funcionarioServicoData: FuncionarioServicoDTO = new FuncionarioServicoDTO(element, novoServico.id);
        await funcionarioServicoService.createFuncionarioServico(funcionarioServicoData)
      }); 
      return res.status(201).json(novoServico);
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      }
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async getServicos(req: Request, res: Response){
    try {
      const servicos = await servicoService.getServicos();
      return res.status(200).json(servicos);
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      }
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async getServicoById(req: Request, res: Response){
    try {
      const { id } = req.params;
      const servico = await servicoService.getServicoById(id);
      return res.status(200).json(servico);
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      }
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async getServicoByPlaca(req: Request, res: Response){
    try {
      const { placa } = req.params;
      const servico = await servicoService.getServicoByPlaca(placa);
      return res.status(200).json(servico);
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  async getServicosPage(req: Request, res: Response){
    try {
      const page = parseInt(req.params.page, 10);
      const pageSize = parseInt(req.params.pageSize, 10);
      const filtroPagamento = parseInt(req.params.filtroPagamento, 10);
      if (isNaN(page) || isNaN(pageSize)) {
        return res.status(400).send({ error: 'Os parâmetros page e pageSize devem ser números válidos.' });
      }
      const servicos = await servicoService.getServicosPage(page, pageSize, filtroPagamento);
      const total = await servicoService.getTotalServicos(filtroPagamento);
      return res.status(200).json({ servicos, total });
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  async getServicosPageByProprietario(req: Request, res: Response){
    try {
      const page = parseInt(req.params.page, 10);
      const pageSize = parseInt(req.params.pageSize, 10);
      const filtroPagamento = parseInt(req.params.filtroPagamento, 10);
      const name = req.params.proprietario;
      if (isNaN(page) || isNaN(pageSize)) {
        return res.status(400).send({ error: 'Os parâmetros page e pageSize devem ser números válidos.' });
      }
      const servicos = await servicoService.getServicosPageByProprietario(page, pageSize, filtroPagamento, name);
      const total = await servicoService.getTotalServicosByProprietario(filtroPagamento, name);
      return res.status(200).json({ servicos, total });
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }
  
  async getServicosIdProprietarioPage(req: Request, res: Response){
    try {
      const id = req.params.id;
      const page = parseInt(req.params.page, 10);
      const pageSize = parseInt(req.params.pageSize, 10);
      if (isNaN(page) || isNaN(pageSize)) {
        return res.status(400).send({ error: 'Os parâmetros page e pageSize devem ser números válidos.' });
      }
      const servicos = await servicoService.getServicosIdPage(page, pageSize, id);
      const total = await servicoService.getTotalServicosId(id);
      return res.status(200).json({ servicos, total });
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  async updateServicoById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const servicoData: ServicoDTO = new ServicoDTO(req.body);
      const servicoAtualizado = await servicoService.updateServicoById(id, servicoData);
      return res.status(200).json(servicoAtualizado);
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      }
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async deleteServicoById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await servicoService.deleteServicoById(id);
      return res.status(204).send();
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      }
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async getTotalServicosCalendario(req: Request, res: Response) {
    try {
      const totais = await servicoService.getTotalServicosCalendario();
      return res.status(200).json(totais);
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      }
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }

};
