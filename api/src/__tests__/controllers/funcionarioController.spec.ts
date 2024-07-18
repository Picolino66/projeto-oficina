import { Request, Response } from 'express';
import { FuncionarioController } from '../../controllers/funcionarioController';
import { FuncionarioService } from '../../services/funcionarioService';

const funcionarioData = {
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

const novoFuncionario = {
    id: 'funcionarioIdGeradoPeloServico',
    ...funcionarioData  // Spread operator para incluir as propriedades de funcionarioData
};

const listaFuncionarios = [
    { servicos: [], ...novoFuncionario },
    { servicos: [], ...novoFuncionario },
    { servicos: [], ...novoFuncionario }
];

const res: Partial<Response> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
};

jest.mock('../../services/funcionarioService');

describe('Teste do funcionarioController', () => {
    beforeEach(() => {
        jest.clearAllMocks();
      });

    describe('Teste do método createfuncionario', () => {
        it('Deve criar um novo funcionario', async () => {
            // Configurando os dados do funcionario
            const req = {
                body: funcionarioData
            };
            
            jest.spyOn(FuncionarioService.prototype, 'createFuncionario').mockResolvedValue(novoFuncionario);
            await FuncionarioController.prototype.createFuncionario(req as Request, res as Response);

            expect(FuncionarioService.prototype.createFuncionario).toHaveBeenCalledTimes(1);
            expect(FuncionarioService.prototype.createFuncionario).toHaveBeenCalledWith(funcionarioData);
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalled();
            expect(res.json).toHaveBeenCalledWith(novoFuncionario)
        });

        it('Deve retornar um status 400 e um json com a mensagem de erro de CPF obrigatório', async () => {
            // Configurando os dados do funcionario
            const funcionarioData = {
                nome: 'Fulano'
            };

            const req = {
                body: funcionarioData
            };
            
            jest.spyOn(FuncionarioService.prototype, 'createFuncionario').mockResolvedValue(novoFuncionario);
            await FuncionarioController.prototype.createFuncionario(req as Request, res as Response);

            // Para funcionar o res tem que estar dentro do contexto
            //const jsonArg = (res.json as jest.Mock).mock.calls[0][0]; //Obtém o primeiro argumento passado para res.json()
            //console.log('Mensagem retornada:', jsonArg.message); // Imprime a mensagem retornada
            
            // Verifica se o método createFuncionario do FuncionarioService não foi chamado pois parou no DTO
            expect(FuncionarioService.prototype.createFuncionario).toHaveBeenCalledTimes(0);
            expect(res.json).toHaveBeenCalledWith({ message: 'CPF é um campo obrigatório.' });
            expect(res.status).toHaveBeenCalledWith(400);
        });

        it('Deve retornar um status 400 e um json com a mensagem de erro de telefone deve conter 11 dígitos', async () => {
            // Configurando os dados do funcionario
            const funcionarioData = {
                nome: 'Fulano',
                cpf: "49049452122",
                telefone: "1",
                logradouro: "string",
                numero: "string",
                complemento: "string",
                bairro: "string",
                cidade: "string",
                cep: "string"        
            };

            const req = {
                body: funcionarioData
            };
            
            jest.spyOn(FuncionarioService.prototype, 'createFuncionario').mockResolvedValue(novoFuncionario);
            await FuncionarioController.prototype.createFuncionario(req as Request, res as Response);

            // Para funcionar o res tem que estar dentro do contexto
            //const jsonArg = (res.json as jest.Mock).mock.calls[0][0]; //Obtém o primeiro argumento passado para res.json()
            //console.log('Mensagem retornada:', jsonArg.message); // Imprime a mensagem retornada
            
            // Verifica se o método createFuncionario do FuncionarioService não foi chamado pois parou no DTO
            expect(FuncionarioService.prototype.createFuncionario).toHaveBeenCalledTimes(0);
            expect(res.json).toHaveBeenCalledWith({ message: 'Telefone deve conter 11 dígitos.' });
            expect(res.status).toHaveBeenCalledWith(400);
        });
        
        it('Deve retornar um status 400 e um json com a mensagem de erro', async () => {
            // Configurando os dados do funcionario
            const req = {
                body: funcionarioData
            };
            // Se o método createFuncionario retornar um erro, o método createFuncionario do FuncionarioController deve retornar um status 400 e um json com a mensagem de erro.
            jest.spyOn(FuncionarioService.prototype, 'createFuncionario').mockRejectedValue(new Error('Erro ao criar funcionario'));
            await FuncionarioController.prototype.createFuncionario(req as Request, res as Response);

            expect(FuncionarioService.prototype.createFuncionario).toHaveBeenCalledTimes(1);
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ message: 'Erro ao criar funcionario' });
        });


        it('Deve retornar um status 500 e um json com a mensagem de erro', async () => {
            // Configurando os dados do funcionario
            const req = {
                body: funcionarioData
            };

            jest.spyOn(FuncionarioService.prototype, 'createFuncionario').mockRejectedValue('Internal Server Error');
            await FuncionarioController.prototype.createFuncionario(req as Request, res as Response);

            expect(FuncionarioService.prototype.createFuncionario).toHaveBeenCalledTimes(1);
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ message: 'Internal Server Error' });
        });
    });

    describe('Teste do método getFuncionarios', () => {
        it('Deve retornar uma lista de funcionarios', async () => {
            jest.spyOn(FuncionarioService.prototype, 'getFuncionarios').mockResolvedValueOnce(listaFuncionarios);
            await FuncionarioController.prototype.getFuncionarios({} as Request, res as Response);

            expect(FuncionarioService.prototype.getFuncionarios).toHaveBeenCalledTimes(1);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalled();
            expect(res.json).toHaveBeenCalledWith(listaFuncionarios)
        });

        it('Deve retornar um status 500 e um json com a mensagem de erro', async () => {
            jest.spyOn(FuncionarioService.prototype, 'getFuncionarios').mockRejectedValue('Internal Server Error');
            await FuncionarioController.prototype.getFuncionarios({} as Request, res as Response);

            expect(FuncionarioService.prototype.getFuncionarios).toHaveBeenCalledTimes(1);
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ message: 'Internal Server Error' });
        });
    });

    describe('Teste do método getFuncionarioById', () => {
        it('Deve retornar um funcionario', async () => {
            // Defina o ID do funcionario fictício para o teste
            const funcionarioId = 'c674ed34-e542-4444-8c28-cada9651fa';

            // Defina o objeto `req` com as propriedades necessárias
            const req: unknown = {
                params: { id: funcionarioId }
            };

            jest.spyOn(FuncionarioService.prototype, 'getFuncionarioById').mockResolvedValue({ servicos: [], ...novoFuncionario });
            await FuncionarioController.prototype.getFuncionarioById(req as Request, res as Response);

            expect(FuncionarioService.prototype.getFuncionarioById).toHaveBeenCalledTimes(1);
            expect(FuncionarioService.prototype.getFuncionarioById).toHaveBeenCalledWith(funcionarioId);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalled();
            expect(res.json).toHaveBeenCalledWith({servicos: [], ...novoFuncionario });
        });

        it('Deve retornar um status 500 e um json com a mensagem de erro', async () => {
            jest.spyOn(FuncionarioService.prototype, 'getFuncionarioById').mockRejectedValue('Internal Server Error');
            await FuncionarioController.prototype.getFuncionarioById({} as Request, res as Response);

            expect(FuncionarioService.prototype.getFuncionarioById).toHaveBeenCalledTimes(0);
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ message: 'Internal Server Error' });
        });
    });

    describe('Teste do método updateFuncionarioById', () => {
        it('Deve atualizar um funcionario', async () => {
            // Defina o ID do funcionario fictício para o teste
            const funcionarioId = 'c674ed34-e542-4444-8c28-cada9651fa';

            // Defina o objeto `req` com as propriedades necessárias
            const req: unknown = {
                params: { id: funcionarioId },
                body: funcionarioData
            };

            
            jest.spyOn(FuncionarioService.prototype, 'updateFuncionarioById').mockResolvedValue(novoFuncionario);
            await FuncionarioController.prototype.updateFuncionarioById(req as Request, res as Response);

            expect(FuncionarioService.prototype.updateFuncionarioById).toHaveBeenCalledTimes(1);
            expect(FuncionarioService.prototype.updateFuncionarioById).toHaveBeenCalledWith(funcionarioId, funcionarioData);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalled();
            expect(res.json).toHaveBeenCalledWith(novoFuncionario);
        });

        it('Deve retornar um status 400 e um json com a mensagem de erro', async () => {
            // Defina o ID do funcionario fictício para o teste
            const funcionarioId = 'c674ed34-e542-4444-8c28-cada9651fa';

            const req: unknown = {
                params: { id: funcionarioId },
                body: funcionarioData
            };

            jest.spyOn(FuncionarioService.prototype, 'updateFuncionarioById').mockRejectedValue(new Error('Erro ao criar funcionario'));
            await FuncionarioController.prototype.updateFuncionarioById(req as Request, res as Response);

            expect(FuncionarioService.prototype.updateFuncionarioById).toHaveBeenCalledTimes(1);
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ message: 'Erro ao criar funcionario' });
        });


        it('Deve retornar um status 500 e um json com a mensagem de erro', async () => {
            // Defina o ID do funcionario fictício para o teste
            const funcionarioId = 'c674ed34-e542-4444-8c28-cada9651fa';

            const req: unknown = {
                params: { id: funcionarioId },
                body: funcionarioData
            };

            jest.spyOn(FuncionarioService.prototype, 'updateFuncionarioById').mockRejectedValue('Internal Server Error');
            await FuncionarioController.prototype.updateFuncionarioById(req as Request, res as Response);

            expect(FuncionarioService.prototype.updateFuncionarioById).toHaveBeenCalledTimes(1);
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ message: 'Internal Server Error' });
        });
     });

     describe('Teste do método deleteFuncionarioById', () => {
        it('Deve deletar um funcionario', async () => {
            // Defina o ID do funcionario fictício para o teste
            const funcionarioId = 'c674ed34-e542-4444-8c28-cada9651fa';

            // Defina o objeto `req` com as propriedades necessárias
            const req: unknown = {
                params: { id: funcionarioId }
            };
            jest.spyOn(FuncionarioService.prototype, 'deleteFuncionarioById').mockResolvedValue(undefined);
            await FuncionarioController.prototype.deleteFuncionarioById(req as Request, res as Response);

            expect(FuncionarioService.prototype.deleteFuncionarioById).toHaveBeenCalledTimes(1);
            expect(FuncionarioService.prototype.deleteFuncionarioById).toHaveBeenCalledWith(funcionarioId);
            expect(res.status).toHaveBeenCalledWith(204);
            
        });

        it('Deve retornar um status 400 e um json com a mensagem de erro', async () => {
            // Defina o ID do funcionario fictício para o teste
            const funcionarioId = 'c674ed34-e542-4444-8c28-cada9651fa';

            const req: unknown = {
                params: { id: funcionarioId }
            };

            jest.spyOn(FuncionarioService.prototype, 'deleteFuncionarioById').mockRejectedValue(new Error('Erro ao deletar funcionario'));
            await FuncionarioController.prototype.deleteFuncionarioById(req as Request, res as Response);

            expect(FuncionarioService.prototype.deleteFuncionarioById).toHaveBeenCalledTimes(1);
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ message: 'Erro ao deletar funcionario' });
        });

        it('Deve retornar um status 500 e um json com a mensagem de erro', async () => {

            // Defina o ID do funcionario fictício para o teste
            const funcionarioId = 'c674ed34-e542-4444-8c28-cada9651fa';

            const req: unknown = {
                params: { id: funcionarioId }
            };

            jest.spyOn(FuncionarioService.prototype, 'deleteFuncionarioById').mockRejectedValue('Internal Server Error');
            await FuncionarioController.prototype.deleteFuncionarioById(req as Request, res as Response);

            expect(FuncionarioService.prototype.deleteFuncionarioById).toHaveBeenCalledTimes(1);
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ message: 'Internal Server Error' });
        } );
    
    });
});