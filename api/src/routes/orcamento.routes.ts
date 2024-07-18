// src/routes/OrcamentoRoutes.js
import {Router} from 'express';
import {OrcamentoController} from '../controllers/orcamentoController';
const orcamentoController = new OrcamentoController();
const orcamentoRoutes = Router();

orcamentoRoutes.post('/', orcamentoController.createOrcamento);
orcamentoRoutes.get('/', orcamentoController.getOrcamentos);
orcamentoRoutes.get('/:id', orcamentoController.getOrcamentoById);
orcamentoRoutes.put('/atualizar/:id', orcamentoController.updateOrcamentoById);
orcamentoRoutes.delete('/deletar/:id', orcamentoController.deleteOrcamentoById);

export {orcamentoRoutes};