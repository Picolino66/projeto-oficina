import { Cliente } from "./cliente.interface";
import { Veiculo } from "./veiculo.interface";

export interface Servico {
  id: string;
  clienteId: string;
  veiculoId: string;
  nome: string;
  preco: number;
  pagamento: number;
  placa: string;
  km: number;
  dataInicio: Date;
  dataPrevista: Date;
  descricao: string;
  cliente: Cliente;
  veiculo: Veiculo;
  pagouTudo: boolean;
}
