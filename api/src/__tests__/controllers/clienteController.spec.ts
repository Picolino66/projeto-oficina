import { Request, Response } from 'express';
import { ClienteController } from '../../controllers/clienteController';
import { ClienteService } from '../../services/clienteService';

const clienteData = {
    nome: 'Fulano',
    cpf: '12345678901',
    telefone: '12345678901',
    logradouro: 'Rua A',
    numero: '123',
    complemento: 'Casa',
    bairro: 'Centro',
    cidade: 'Cidade',
    cep: '12345678'
};

const novoCliente = {
    id: 'clienteIdGeradoPeloServico',
    ...clienteData  // Spread operator para incluir as propriedades de clienteData
};

const listaClientes = [
    { veiculos: [], servicos: [], ...novoCliente },
    { veiculos: [], servicos: [], ...novoCliente },
    { veiculos: [], servicos: [], ...novoCliente }
];

const res: Partial<Response> = {
    // jest.fn() cria uma função simulada (mock) que podemos monitorar para ver se foi chamada e com quais argumentos foi chamada.
    // returnThis() retorna o objeto que foi chamado para que possamos encadear chamadas de métodos. (ex: res.status(201).json(novoCliente);)
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
};

// Mock da instância de ClienteService
// O jest.mock() cria uma versão simulada do módulo que substitui a implementação original do módulo.
// Pois não queremos testar o serviço de cliente, mas sim o controlador de cliente.
// Não queremos que no teste unitário do controlador de cliente, o serviço de cliente seja chamado.
// Se não a cada vez que rodarmos o teste unitário do controlador de cliente, o teste unitário do serviço de cliente também será rodado.
// e por sua vez irá chamar o banco de dados, o que não é desejado em um teste unitário.
jest.mock('../../services/clienteService');

describe('Teste do clienteController', () => {
    beforeEach(() => {
        jest.clearAllMocks();
      });

    describe('Teste do método createCliente', () => {
        it('Deve criar um novo cliente', async () => {
            // Configurando os dados do cliente
            const req = {
                body: clienteData
            };

            jest.spyOn(ClienteService.prototype, 'createCliente').mockResolvedValue(novoCliente);
            await ClienteController.prototype.createCliente(req as Request, res as Response);

            expect(ClienteService.prototype.createCliente).toHaveBeenCalledTimes(1);
            expect(ClienteService.prototype.createCliente).toHaveBeenCalledWith(clienteData);
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalled();
            expect(res.json).toHaveBeenCalledWith(novoCliente)
        });

        it('Deve retornar um status 400 e um json com a mensagem de erro de CPF obrigatório', async () => {
            // Configurando os dados do cliente
            const clienteData = {
                nome: 'Fulano'
            };

            const req = {
                body: clienteData
            };
            
            jest.spyOn(ClienteService.prototype, 'createCliente').mockResolvedValue(novoCliente);
            await ClienteController.prototype.createCliente(req as Request, res as Response);

            // Para funcionar o res tem que estar dentro do contexto
            //const jsonArg = (res.json as jest.Mock).mock.calls[0][0]; //Obtém o primeiro argumento passado para res.json()
            //console.log('Mensagem retornada:', jsonArg.message); // Imprime a mensagem retornada
            
            // Verifica se o método createCliente do ClienteService não foi chamado pois parou no DTO
            expect(ClienteService.prototype.createCliente).toHaveBeenCalledTimes(0);
            expect(res.json).toHaveBeenCalledWith({ message: 'CPF é um campo obrigatório.' });
            expect(res.status).toHaveBeenCalledWith(400);
        });
        
        it('Deve retornar um status 400 e um json com a mensagem de erro', async () => {
            // Configurando os dados do cliente
            const req = {
                body: clienteData
            };
            // Se o método createCliente retornar um erro, o método createCliente do ClienteController deve retornar um status 400 e um json com a mensagem de erro.
            jest.spyOn(ClienteService.prototype, 'createCliente').mockRejectedValue(new Error('Erro ao criar cliente'));
            await ClienteController.prototype.createCliente(req as Request, res as Response);

            expect(ClienteService.prototype.createCliente).toHaveBeenCalledTimes(1);
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ message: 'Erro ao criar cliente' });
        });


        it('Deve retornar um status 500 e um json com a mensagem de erro', async () => {
            // Configurando os dados do cliente
            const req = {
                body: clienteData
            };

            jest.spyOn(ClienteService.prototype, 'createCliente').mockRejectedValue('Internal Server Error');
            await ClienteController.prototype.createCliente(req as Request, res as Response);

            expect(ClienteService.prototype.createCliente).toHaveBeenCalledTimes(1);
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ message: 'Internal Server Error' });
        });
    });

    describe('Teste do método getClientes', () => {
        it('Deve retornar uma lista de clientes', async () => {
            jest.spyOn(ClienteService.prototype, 'getClientes').mockResolvedValueOnce(listaClientes);
            await ClienteController.prototype.getClientes({} as Request, res as Response);

            expect(ClienteService.prototype.getClientes).toHaveBeenCalledTimes(1);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalled();
            expect(res.json).toHaveBeenCalledWith(listaClientes)
        });

        it('Deve retornar um status 500 e um json com a mensagem de erro', async () => {
            jest.spyOn(ClienteService.prototype, 'getClientes').mockRejectedValue('Internal Server Error');
            await ClienteController.prototype.getClientes({} as Request, res as Response);

            expect(ClienteService.prototype.getClientes).toHaveBeenCalledTimes(1);
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ message: 'Internal Server Error' });
        });
    });

    describe('Teste do método getClienteById', () => {
        it('Deve retornar um cliente', async () => {
            // Defina o ID do cliente fictício para o teste
            const clienteId = 'c674ed34-e542-4444-8c28-cada9651fa';

            // Defina o objeto `req` com as propriedades necessárias
            const req: unknown = {
                params: { id: clienteId }
            };

            jest.spyOn(ClienteService.prototype, 'getClienteById').mockResolvedValue({ veiculos: [], servicos: [], ...novoCliente });
            await ClienteController.prototype.getClienteById(req as Request, res as Response);

            expect(ClienteService.prototype.getClienteById).toHaveBeenCalledTimes(1);
            expect(ClienteService.prototype.getClienteById).toHaveBeenCalledWith(clienteId);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalled();
            expect(res.json).toHaveBeenCalledWith({ veiculos: [], servicos: [], ...novoCliente });
        });

        it('Deve retornar um status 500 e um json com a mensagem de erro', async () => {
            // Defina o ID do cliente fictício para o teste
            const clienteId = 'c674ed34-e542-4444-8c28-cada9651fa';

            // Defina o objeto `req` com as propriedades necessárias
            const req: unknown = {
                params: { id: clienteId }
            };
            
            jest.spyOn(ClienteService.prototype, 'getClienteById').mockRejectedValue('Internal Server Error');
            await ClienteController.prototype.getClienteById(req as Request, res as Response);

            expect(ClienteService.prototype.getClienteById).toHaveBeenCalledTimes(1);
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ message: 'Internal Server Error' });
        });
    });

    describe('Teste do método updateClienteById', () => {
        it('Deve atualizar um cliente', async () => {
            // Defina o ID do cliente fictício para o teste
            const clienteId = 'c674ed34-e542-4444-8c28-cada9651fa';

            // Defina o objeto `req` com as propriedades necessárias
            const req: unknown = {
                params: { id: clienteId },
                body: clienteData
            };

            
            jest.spyOn(ClienteService.prototype, 'updateClienteById').mockResolvedValue(novoCliente);
            await ClienteController.prototype.updateClienteById(req as Request, res as Response);

            expect(ClienteService.prototype.updateClienteById).toHaveBeenCalledTimes(1);
            expect(ClienteService.prototype.updateClienteById).toHaveBeenCalledWith(clienteId, clienteData);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalled();
            expect(res.json).toHaveBeenCalledWith(novoCliente);
        });

        it('Deve retornar um status 400 e um json com a mensagem de erro', async () => {
            // Defina o ID do cliente fictício para o teste
            const clienteId = 'c674ed34-e542-4444-8c28-cada9651fa';

            const req: unknown = {
                params: { id: clienteId },
                body: clienteData
            };

            jest.spyOn(ClienteService.prototype, 'updateClienteById').mockRejectedValue(new Error('Erro ao criar cliente'));
            await ClienteController.prototype.updateClienteById(req as Request, res as Response);

            expect(ClienteService.prototype.updateClienteById).toHaveBeenCalledTimes(1);
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ message: 'Erro ao criar cliente' });
        });


        it('Deve retornar um status 500 e um json com a mensagem de erro', async () => {
            // Defina o ID do cliente fictício para o teste
            const clienteId = 'c674ed34-e542-4444-8c28-cada9651fa';

            const req: unknown = {
                params: { id: clienteId },
                body: clienteData
            };

            jest.spyOn(ClienteService.prototype, 'updateClienteById').mockRejectedValue('Internal Server Error');
            await ClienteController.prototype.updateClienteById(req as Request, res as Response);

            expect(ClienteService.prototype.updateClienteById).toHaveBeenCalledTimes(1);
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ message: 'Internal Server Error' });
        });
     });

     describe('Teste do método deleteClienteById', () => {
        it('Deve deletar um cliente', async () => {
            // Defina o ID do cliente fictício para o teste
            const clienteId = 'c674ed34-e542-4444-8c28-cada9651fa';

            // Defina o objeto `req` com as propriedades necessárias
            const req: unknown = {
                params: { id: clienteId }
            };
            jest.spyOn(ClienteService.prototype, 'deleteClienteById').mockResolvedValue(undefined);
            await ClienteController.prototype.deleteClienteById(req as Request, res as Response);

            expect(ClienteService.prototype.deleteClienteById).toHaveBeenCalledTimes(1);
            expect(ClienteService.prototype.deleteClienteById).toHaveBeenCalledWith(clienteId);
            expect(res.status).toHaveBeenCalledWith(204);
            
        });

        it('Deve retornar um status 400 e um json com a mensagem de erro', async () => {
            // Defina o ID do cliente fictício para o teste
            const clienteId = 'c674ed34-e542-4444-8c28-cada9651fa';

            const req: unknown = {
                params: { id: clienteId }
            };

            jest.spyOn(ClienteService.prototype, 'deleteClienteById').mockRejectedValue(new Error('Erro ao deletar cliente'));
            await ClienteController.prototype.deleteClienteById(req as Request, res as Response);

            expect(ClienteService.prototype.deleteClienteById).toHaveBeenCalledTimes(1);
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ message: 'Erro ao deletar cliente' });
        });

        it('Deve retornar um status 500 e um json com a mensagem de erro', async () => {

            // Defina o ID do cliente fictício para o teste
            const clienteId = 'c674ed34-e542-4444-8c28-cada9651fa';

            const req: unknown = {
                params: { id: clienteId }
            };

            jest.spyOn(ClienteService.prototype, 'deleteClienteById').mockRejectedValue('Internal Server Error');
            await ClienteController.prototype.deleteClienteById(req as Request, res as Response);

            expect(ClienteService.prototype.deleteClienteById).toHaveBeenCalledTimes(1);
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ message: 'Internal Server Error' });
        } );
    
    });
});