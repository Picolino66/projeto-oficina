import { Cliente, Funcionario, Veiculo } from "@prisma/client";

// ServicoDTO.ts
interface ServicoDTO {
  clienteId: string;
  veiculoId: string;
  placa: string;
  km: number;
  nome: string;
  preco: number;
  pagamento: number;
  dataInicio: string;
  dataPrevista: string;
  descricao: string;
  visivel: boolean;
  funcionario: Funcionario;
  cliente: Cliente;
  veiculo: Veiculo
}

class ServicoDTO {
  constructor(data: ServicoDTO) {
    this.clienteId = this.validadeClientId(data.clienteId)
    this.veiculoId = this.validadeVeiculoId(data.veiculoId)
    this.nome = this.validateNome(data.nome);
    this.preco = this.validatePreco(data.preco);
    this.placa = this.validatePlaca(data.placa);
    this.km = this.validateKm(data.km);
    this.descricao = this.validateDescricao(data.descricao);
    this.pagamento = this.validatePagamento(data.pagamento);
  }
  validateDescricao(descricao: string): string {
    if (!descricao || descricao.trim() === '') {
      throw new Error("Descricao é um campo obrigatório.");
    }
    return descricao;
  }

  validateKm(km: number): number {
    if (!km || km < 0) {
      throw new Error("km é um campo obrigatório.");
    } else if (typeof km !== 'number' || isNaN(km)) {
      throw new Error("A quilometragem deve ser um número válido.");
    }
    return km;
  }

  validatePlaca(placa: string): string {
    const regexPlaca = /^[A-Za-z]{3}-\d{4}$|^[A-Za-z]{3}\d[A-Za-z]\d{2}$/;

    if (!placa || placa.trim() === '') {
      return placa;
    }
    else if (!regexPlaca.test(placa)) {
        throw new Error("Placa inválida. Por favor, forneça uma placa no formato ABC-1234 ou ABC1D23.");
    }
    return placa;
  }

  validatePreco(preco: number): number {
    if (!preco || preco < 0) {
      throw new Error("Preco é um campo obrigatório.");
    } else if (typeof preco !== 'number' || isNaN(preco)) {
      throw new Error("O preco deve ser um número válido.");
    }
    return preco;
  }

  validatePagamento(pagamento: number): number {
    if (typeof pagamento !== 'number' || isNaN(pagamento)) {
      throw new Error("O pagamento deve ser um número válido.");
    }
    return pagamento;
  }

  validateNome(nome: string): string {
    if (!nome || nome.trim() === '') {
      throw new Error("Nome é um campo obrigatório.");
    }
    return nome;
  }

  validadeVeiculoId(veiculoId: string): string {
    if (!veiculoId || veiculoId.trim() === '') {
      throw new Error("veiculoId é um campo obrigatório.");
    }
    return veiculoId;
  }

  validadeClientId(clienteId: string): string {
    if (!clienteId || clienteId.trim() === '') {
      throw new Error("clienteId é um campo obrigatório.");
    }
    return clienteId;
  }

}

export default ServicoDTO;
