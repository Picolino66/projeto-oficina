import { Servico } from "./servico.interface";
import { Veiculo } from "./veiculo.interface";

export interface Cliente {
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
  veiculos: Veiculo[];
  servicos: Servico[];
}
