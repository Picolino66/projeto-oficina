import { Cliente } from "./cliente.interface";

export interface Veiculo {
  id: string;
  clienteId: string;
  tipo: string;
  modelo: string;
  marca: string;
  placa: string;
  cor: string;
  ano: number;
  clienteNome: string;
  cliente: Cliente;
}
