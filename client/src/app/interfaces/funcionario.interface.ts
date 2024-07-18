import { FuncionarioServico } from "./funcionarioServico.interface";

export interface Funcionario {
  id: string;
  nome: string;
  cpf: string;
  telefone: string;
  logradouro: string;
  numero: string;
  complemento: string;
  bairro: string;
  cidade: string;
  cep: string;
  servicos: FuncionarioServico[];
}
