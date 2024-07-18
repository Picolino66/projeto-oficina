// src/routes/veiculo.routes.js
import {Router} from 'express';
import {VeiculoController} from '../controllers/veiculoController';
const veiculoController = new VeiculoController();
const veiculoRoutes = Router();

veiculoRoutes.post('/', veiculoController.createVeiculo);
veiculoRoutes.get('/', veiculoController.getVeiculos);
veiculoRoutes.get('/:id', veiculoController.getVeiculoById);
veiculoRoutes.get('/byCliente/:idCliente', veiculoController.getVeiculoByIdCliente);
veiculoRoutes.get('/placa/:placa', veiculoController.getVeiculoByPlaca);
veiculoRoutes.get('/page/:page/:pageSize', veiculoController.getVeiculosPage);
veiculoRoutes.get('/:id/page/:page/:pageSize', veiculoController.getVeiculosIdPage);
veiculoRoutes.get('/nomePage/:name/:page/:pageSize', veiculoController.getVeiculosPageByName);
veiculoRoutes.put('/atualizar/:id', veiculoController.updateVeiculoById);
veiculoRoutes.delete('/deletar/:id', veiculoController.deleteVeiculoById);

export {veiculoRoutes};
