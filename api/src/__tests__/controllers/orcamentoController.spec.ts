import { Request, Response } from 'express';
import { OrcamentoController } from '../../controllers/orcamentoController';
import { OrcamentoService } from '../../services/orcamentoService';

const orcamentoData = {
    modeloVeiculo: 'Fusca',
    descricaoServico: 'Embreagem',
    valorPeca: 200,
    valorServico: 100,
    valorTotal: 300,
    data: new Date('2023-02-09T12:00:00.000Z'),
    responsavel: 'Perninha',
    observacao: 'Testando'
};

const novoOrcamento = {
    id: 'orcamentoIdGeradoPeloServico',
    modelo_veiculo: orcamentoData.modeloVeiculo, // Renomeando propriedade para corresponder ao formato esperado
    descricao_servico: orcamentoData.descricaoServico, 
    valor_peca: orcamentoData.valorPeca,
    valor_servico: orcamentoData.valorServico,
    valor_total: orcamentoData.valorTotal, 
    data: orcamentoData.data,
    responsavel: orcamentoData.responsavel,
    observacao: orcamentoData.observacao
};

const listaOrcamentos = [
    { ...novoOrcamento },
    { ...novoOrcamento }
];

const res: Partial<Response> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
};


jest.mock('../../services/orcamentoService');

describe('Teste do orcamentoController', () => {
    beforeEach(() => {
        jest.clearAllMocks();
      });

    describe('Teste do método createOrcamento', () => {
        it('Deve criar um novo orcamento', async () => {
            // Configurando os dados do Orcamento
            const req = {
                body: orcamentoData
            };

            jest.spyOn(OrcamentoService.prototype, 'createOrcamento').mockResolvedValue(novoOrcamento);
            await OrcamentoController.prototype.createOrcamento(req as Request, res as Response);
            
            expect(res.status).toHaveBeenCalledWith(201);
            expect(OrcamentoService.prototype.createOrcamento).toHaveBeenCalledTimes(1);
            expect(OrcamentoService.prototype.createOrcamento).toHaveBeenCalledWith(orcamentoData);
         
            expect(res.json).toHaveBeenCalled();
            expect(res.json).toHaveBeenCalledWith(novoOrcamento)
        });

        it('Deve retornar um status 400 e um json com a mensagem de erro de O modelo do Veículo é um campo obrigatório', async () => {
            // Configurando os dados do Orcamento
            const OrcamentoData = {
                modelo_veiculo: 'Fusca'
            };

            const req = {
                body: OrcamentoData
            };
            
            jest.spyOn(OrcamentoService.prototype, 'createOrcamento').mockResolvedValue(novoOrcamento);
            await OrcamentoController.prototype.createOrcamento(req as Request, res as Response);

            // Para funcionar o res tem que estar dentro do contexto
            //const jsonArg = (res.json as jest.Mock).mock.calls[0][0]; //Obtém o primeiro argumento passado para res.json()
            //console.log('Mensagem retornada:', jsonArg.message); // Imprime a mensagem retornada
            
            // Verifica se o método createOrcamento do OrcamentoService não foi chamado pois parou no DTO
            expect(OrcamentoService.prototype.createOrcamento).toHaveBeenCalledTimes(0);
            expect(res.json).toHaveBeenCalledWith({ message: 'O modelo do Veículo é um campo obrigatório.' });
            expect(res.status).toHaveBeenCalledWith(400);
        });
        
        it('Deve retornar um status 400 e um json com a mensagem de erro de data futura', async () => {
            // Configurando os dados do funcionario
            const orcamentoData = {
                modeloVeiculo: 'Fusca',
                descricaoServico: 'Embreagem',
                valorPeca: 200,
                valorServico: 100,
                valorTotal: 300,
                data: '2099-02-09T12:00:00.000Z',
                responsavel: 'Perninha',
                observacao: 'Testando'
            };

            const req = {
                body: orcamentoData
            };
            
            jest.spyOn(OrcamentoService.prototype, 'createOrcamento').mockResolvedValue(novoOrcamento);
            await OrcamentoController.prototype.createOrcamento(req as Request, res as Response);

            // Para funcionar o res tem que estar dentro do contexto
            //const jsonArg = (res.json as jest.Mock).mock.calls[0][0]; //Obtém o primeiro argumento passado para res.json()
            //console.log('Mensagem retornada:', jsonArg.message); // Imprime a mensagem retornada
            
            // Verifica se o método createFuncionario do FuncionarioService não foi chamado pois parou no DTO
            expect(OrcamentoService.prototype.createOrcamento).toHaveBeenCalledTimes(0);
            expect(res.json).toHaveBeenCalledWith({ message: 'Data inválida. A data não pode ser maior que a data atual.' });
            expect(res.status).toHaveBeenCalledWith(400);
        });


        it('Deve retornar um status 400 e um json com a mensagem de erro generica', async () => {
            // Configurando os dados do Orcamento
            const req = {
                body: orcamentoData
            };
            // Se o método createOrcamento retornar um erro, o método createOrcamento do OrcamentoController deve retornar um status 400 e um json com a mensagem de erro.
            jest.spyOn(OrcamentoService.prototype, 'createOrcamento').mockRejectedValue(new Error('Erro ao criar Orcamento'));
            await OrcamentoController.prototype.createOrcamento(req as Request, res as Response);

            expect(OrcamentoService.prototype.createOrcamento).toHaveBeenCalledTimes(1);
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ message: 'Erro ao criar Orcamento' });
        });


        it('Deve retornar um status 500 e um json com a mensagem de erro', async () => {
            // Configurando os dados do Orcamento
            const req = {
                body: orcamentoData
            };

            jest.spyOn(OrcamentoService.prototype, 'createOrcamento').mockRejectedValue('Internal Server Error');
            await OrcamentoController.prototype.createOrcamento(req as Request, res as Response);

            expect(OrcamentoService.prototype.createOrcamento).toHaveBeenCalledTimes(1);
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ message: 'Internal Server Error' });
        });
    });

    describe('Teste do método getOrcamentos', () => {
        it('Deve retornar uma lista de orcamentos', async () => {
            jest.spyOn(OrcamentoService.prototype, 'getOrcamentos').mockResolvedValueOnce(listaOrcamentos);
            await OrcamentoController.prototype.getOrcamentos({} as Request, res as Response);

            expect(OrcamentoService.prototype.getOrcamentos).toHaveBeenCalledTimes(1);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalled();
            expect(res.json).toHaveBeenCalledWith(listaOrcamentos)
        });

        it('Deve retornar um status 500 e um json com a mensagem de erro', async () => {
            jest.spyOn(OrcamentoService.prototype, 'getOrcamentos').mockRejectedValue('Internal Server Error');
            await OrcamentoController.prototype.getOrcamentos({} as Request, res as Response);

            expect(OrcamentoService.prototype.getOrcamentos).toHaveBeenCalledTimes(1);
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ message: 'Internal Server Error' });
        });
    });

    describe('Teste do método getOrcamentoId', () => {
        it('Deve retornar um Orcamento', async () => {
            // Defina o ID do Orcamento fictício para o teste
            const OrcamentoId = 'c674ed34-e542-4444-8c28-cada9651fa';

            // Defina o objeto `req` com as propriedades necessárias
            const req: unknown = {
                params: { id: OrcamentoId }
            };

            jest.spyOn(OrcamentoService.prototype, 'getOrcamentoById').mockResolvedValue(novoOrcamento);
            await OrcamentoController.prototype.getOrcamentoById(req as Request, res as Response);

            expect(OrcamentoService.prototype.getOrcamentoById).toHaveBeenCalledTimes(1);
            expect(OrcamentoService.prototype.getOrcamentoById).toHaveBeenCalledWith(OrcamentoId);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalled();
            expect(res.json).toHaveBeenCalledWith(novoOrcamento);
        });

        it('Deve retornar um status 500 e um json com a mensagem de erro', async () => {
            // Defina o ID do Orcamento fictício para o teste
            const OrcamentoId = 'c674ed34-e542-4444-8c28-cada9651fa';

            // Defina o objeto `req` com as propriedades necessárias
            const req: unknown = {
                params: { id: OrcamentoId }
            };


            jest.spyOn(OrcamentoService.prototype, 'getOrcamentoById').mockRejectedValue('Internal Server Error');
            await OrcamentoController.prototype.getOrcamentoById(req as Request, res as Response);

            expect(OrcamentoService.prototype.getOrcamentoById).toHaveBeenCalledTimes(1);
            expect(res.json).toHaveBeenCalledWith({ message: 'Internal Server Error' });
            expect(res.status).toHaveBeenCalledWith(500);
            
        });
    });

    describe('Teste do método updateOrcamentoById', () => {
        it('Deve atualizar um orcamento', async () => {
            // Defina o ID do Orcamento fictício para o teste
            const orcamentoId = 'c674ed34-e542-4444-8c28-cada9651fa';

            // Defina o objeto `req` com as propriedades necessárias
            const req: unknown = {
                params: { id: orcamentoId },
                body: orcamentoData
            };

            
            jest.spyOn(OrcamentoService.prototype, 'updateOrcamentoById').mockResolvedValue(novoOrcamento);
            await OrcamentoController.prototype.updateOrcamentoById(req as Request, res as Response);

            expect(OrcamentoService.prototype.updateOrcamentoById).toHaveBeenCalledTimes(1);
            expect(OrcamentoService.prototype.updateOrcamentoById).toHaveBeenCalledWith(orcamentoId, orcamentoData);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalled();
            expect(res.json).toHaveBeenCalledWith(novoOrcamento);
        });

        it('Deve retornar um status 400 e um json com a mensagem de erro', async () => {
            // Defina o ID do Orcamento fictício para o teste
            const OrcamentoId = 'c674ed34-e542-4444-8c28-cada9651fa';

            const req: unknown = {
                params: { id: OrcamentoId },
                body: orcamentoData
            };

            jest.spyOn(OrcamentoService.prototype, 'updateOrcamentoById').mockRejectedValue(new Error('Erro ao criar Orcamento'));
            await OrcamentoController.prototype.updateOrcamentoById(req as Request, res as Response);

            expect(OrcamentoService.prototype.updateOrcamentoById).toHaveBeenCalledTimes(1);
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ message: 'Erro ao criar Orcamento' });
        });


        it('Deve retornar um status 500 e um json com a mensagem de erro', async () => {
            // Defina o ID do Orcamento fictício para o teste
            const OrcamentoId = 'c674ed34-e542-4444-8c28-cada9651fa';

            const req: unknown = {
                params: { id: OrcamentoId },
                body: orcamentoData
            };

            jest.spyOn(OrcamentoService.prototype, 'updateOrcamentoById').mockRejectedValue('Internal Server Error');
            await OrcamentoController.prototype.updateOrcamentoById(req as Request, res as Response);

            expect(OrcamentoService.prototype.updateOrcamentoById).toHaveBeenCalledTimes(1);
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ message: 'Internal Server Error' });
        });
     });

     describe('Teste do método deleteOrcamentoById', () => {
        it('Deve deletar um Orcamento', async () => {
            // Defina o ID do Orcamento fictício para o teste
            const OrcamentoId = 'c674ed34-e542-4444-8c28-cada9651fa';

            // Defina o objeto `req` com as propriedades necessárias
            const req: unknown = {
                params: { id: OrcamentoId }
            };
            
            jest.spyOn(OrcamentoService.prototype, 'deleteOrcamentoById').mockResolvedValue(undefined);
            await OrcamentoController.prototype.deleteOrcamentoById(req as Request, res as Response);

            expect(OrcamentoService.prototype.deleteOrcamentoById).toHaveBeenCalledTimes(1);
            expect(OrcamentoService.prototype.deleteOrcamentoById).toHaveBeenCalledWith(OrcamentoId);
            expect(res.status).toHaveBeenCalledWith(204);
            
        });

        it('Deve retornar um status 400 e um json com a mensagem de erro', async () => {
            // Defina o ID do Orcamento fictício para o teste
            const OrcamentoId = 'c674ed34-e542-4444-8c28-cada9651fa';

            const req: unknown = {
                params: { id: OrcamentoId }
            };

            jest.spyOn(OrcamentoService.prototype, 'deleteOrcamentoById').mockRejectedValue(new Error('Erro ao deletar Orcamento'));
            await OrcamentoController.prototype.deleteOrcamentoById(req as Request, res as Response);

            expect(OrcamentoService.prototype.deleteOrcamentoById).toHaveBeenCalledTimes(1);
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ message: 'Erro ao deletar Orcamento' });
        });

        it('Deve retornar um status 500 e um json com a mensagem de erro', async () => {

            // Defina o ID do Orcamento fictício para o teste
            const OrcamentoId = 'c674ed34-e542-4444-8c28-cada9651fa';

            const req: unknown = {
                params: { id: OrcamentoId }
            };

            jest.spyOn(OrcamentoService.prototype, 'deleteOrcamentoById').mockRejectedValue('Internal Server Error');
            await OrcamentoController.prototype.deleteOrcamentoById(req as Request, res as Response);

            expect(OrcamentoService.prototype.deleteOrcamentoById).toHaveBeenCalledTimes(1);
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ message: 'Internal Server Error' });
        } );
    
    });
    
});