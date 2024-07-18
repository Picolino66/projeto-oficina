// src/routes/servico.routes.js
import {Router} from 'express';
import {ServicoController} from '../controllers/servicoController';
const servicoController = new ServicoController();
const servicoRoutes = Router();

servicoRoutes.post('/', servicoController.createServico);
servicoRoutes.get('/', servicoController.getServicos);
servicoRoutes.get('/total', servicoController.getTotalServicosCalendario);
servicoRoutes.get('/:id', servicoController.getServicoById);
servicoRoutes.get('/placa/:placa', servicoController.getServicoByPlaca);
servicoRoutes.get('/page/:page/:pageSize/:filtroPagamento', servicoController.getServicosPage);
servicoRoutes.get('/page/proprietario/:page/:pageSize/:filtroPagamento/:proprietario', servicoController.getServicosPageByProprietario);
servicoRoutes.get('/:id/page/:page/:pageSize', servicoController.getServicosIdProprietarioPage);
servicoRoutes.put('/atualizar/:id', servicoController.updateServicoById);
servicoRoutes.delete('/deletar/:id', servicoController.deleteServicoById);

export {servicoRoutes};
