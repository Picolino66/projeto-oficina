// src/routes/cliente.routes.js
import {Router} from 'express';
import {ClienteController} from '../controllers/clienteController';
const clienteController = new ClienteController();
const clienteRoutes = Router();

clienteRoutes.post('/', clienteController.createCliente);
clienteRoutes.get('/', clienteController.getClientes);
clienteRoutes.get('/:id', clienteController.getClienteById);
clienteRoutes.get('/nome/:name', clienteController.getClienteByName);
clienteRoutes.get('/nomePage/:name/:page/:pageSize', clienteController.getClientesPageByName);
clienteRoutes.get('/page/:page/:pageSize', clienteController.getClientesPage);
clienteRoutes.put('/atualizar/:id', clienteController.updateClienteById);
clienteRoutes.delete('/deletar/:id', clienteController.deleteClienteById);

export {clienteRoutes};
