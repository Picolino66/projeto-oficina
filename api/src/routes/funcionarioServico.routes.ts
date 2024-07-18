// src/routes/funcionarioServico.routes.js
import {Router} from 'express';
import {FuncionarioServicoController} from '../controllers/funcionarioServicoController';
const funcionarioServicoController = new FuncionarioServicoController();
const funcionarioServicoRoutes = Router();

funcionarioServicoRoutes.post('/', funcionarioServicoController.createFuncionarioServico);
funcionarioServicoRoutes.get('/', funcionarioServicoController.getFuncionarioServicos);
funcionarioServicoRoutes.get('/:funcionarioId/:servicoId', funcionarioServicoController.getFuncionarioServicoById);
funcionarioServicoRoutes.get('/:funcionarioId', funcionarioServicoController.getFuncionarioById);
funcionarioServicoRoutes.put('/atualizar/:funcionarioId/:servicoId', funcionarioServicoController.updateFuncionarioServicoById);
funcionarioServicoRoutes.delete('/deletar/:funcionarioId/:servicoId', funcionarioServicoController.deleteFuncionarioServicoById);
funcionarioServicoRoutes.get('/page/funcionario/:page/:pageSize/:funcionarioId', funcionarioServicoController.getServicosPageByFuncionario);

export {funcionarioServicoRoutes};
