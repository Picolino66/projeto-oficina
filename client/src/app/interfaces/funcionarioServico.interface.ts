import { Funcionario } from "./funcionario.interface";
import { Servico } from "./servico.interface";

export interface FuncionarioServico {
  funcionarioId: string;
  funcionario: Funcionario;
  servicoId: string;
  servico: Servico;
  comissaoPorcentagem: number;
  comissaoValor: number;
  visivel: boolean;
}
