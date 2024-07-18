// src/routes/FuncionarioRoutes.js
import {Router} from 'express';
import {FuncionarioController} from '../controllers/funcionarioController';
const funcionarioController = new FuncionarioController();
const funcionarioRoutes = Router();

funcionarioRoutes.post('/', funcionarioController.createFuncionario);
funcionarioRoutes.get('/', funcionarioController.getFuncionarios);
funcionarioRoutes.get('/:id', funcionarioController.getFuncionarioById);
funcionarioRoutes.get('/nome/:name', funcionarioController.getFuncionarioByName);
funcionarioRoutes.get('/page/:page/:pageSize', funcionarioController.getFuncionariosPage);
funcionarioRoutes.put('/atualizar/:id', funcionarioController.updateFuncionarioById);
funcionarioRoutes.delete('/deletar/:id', funcionarioController.deleteFuncionarioById);

export {funcionarioRoutes};