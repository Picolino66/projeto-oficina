// src/controllers/funcionarioController.js
import { Request, Response } from 'express';
import {FuncionarioService} from '../services/funcionarioService';
import FuncionarioDTO from '../dtos/funcionarioDTO';
const funcionarioService = new FuncionarioService()
export class FuncionarioController{

  async createFuncionario(req: Request, res: Response){
    try {
      const funcionarioData: FuncionarioDTO = new FuncionarioDTO(req.body);
      const novoFuncionario = await funcionarioService.createFuncionario(funcionarioData);
      return res.status(201).json(novoFuncionario);
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  async getFuncionarios(req: Request, res: Response){
    try {
      const funcionarios = await funcionarioService.getFuncionarios();
      return res.status(200).json(funcionarios);
    } catch (error: unknown) {
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  async getFuncionarioById(req: Request, res: Response){
    try {
      const { id } = req.params;
      const funcionario = await funcionarioService.getFuncionarioById(id);
      return res.status(200).json(funcionario);
    } catch (error: unknown) {
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  async getFuncionarioByName(req: Request, res: Response){
    try {
      const { name } = req.params;
      const funcionario = await funcionarioService.getFuncionarioByName(name);
      return res.status(200).json(funcionario);
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  async getFuncionariosPage(req: Request, res: Response){
    try {
      const page = parseInt(req.params.page, 10);
      const pageSize = parseInt(req.params.pageSize, 10);
      if (isNaN(page) || isNaN(pageSize)) {
        return res.status(400).send({ error: 'Os parâmetros page e pageSize devem ser números válidos.' });
      }
      const funcionarios = await funcionarioService.getFuncionariosPage(page, pageSize);
      const total = await funcionarioService.getTotalFuncionarios();
      return res.status(200).json({ funcionarios, total });
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  async updateFuncionarioById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const funcionarioData: FuncionarioDTO = new FuncionarioDTO(req.body);
      const funcionarioAtualizado = await funcionarioService.updateFuncionarioById(id, funcionarioData);
      return res.status(200).json(funcionarioAtualizado);
    }
    catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  async deleteFuncionarioById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await funcionarioService.deleteFuncionarioById(id);
      return res.status(204).send();
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }

};
