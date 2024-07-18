// VeiculoDto.ts
interface VeiculoDto {
  clienteId: string;
  tipo: string;
  modelo: string;
  marca: string;
  placa: string;
  cor: string;
  ano: number;
}

class VeiculoDto {
  constructor(data: VeiculoDto) {
    this.clienteId = this.validadeClientId(data.clienteId)
    this.tipo = this.validateTipo(data.tipo);
    this.modelo = this.validateModelo(data.modelo);
    this.marca = this.validateMarca(data.marca);
    this.placa = this.validatePlaca(data.placa);
    this.cor = this.validateCor(data.cor);
    this.ano = this.validateAno(data.ano);
  }

  private validadeClientId(clientId: string) {
    if (!clientId || clientId.trim() === '') {
      throw new Error("ClientId é um campo obrigatório.");
    }
    return clientId;
  }

  private validateTipo(tipo: string) {
    return tipo;
  }

  private validateModelo(modelo: string) {
    return modelo;
  }

  private validateMarca(marca: string) {
    return marca;
  }

  private validatePlaca(placa: string) {
    const regexPlaca = /^[A-Za-z]{3}-\d{4}$|^[A-Za-z]{3}\d[A-Za-z]\d{2}$/;

    if (!placa || placa.trim() === '') {
      return placa;
    }
    else if (!regexPlaca.test(placa)) {
        throw new Error("Placa inválida. Por favor, forneça uma placa no formato ABC-1234 ou ABC1D23.");
    }
    return placa;
  }

  private validateCor(cor: string) {
    if (!cor || cor.trim() === '') {
      return cor;
    }
    return cor;
  }

  private validateAno(ano: number) {
    const anoAtual = new Date().getFullYear();
    if (!ano) {
      return 0;
    }
    else if (ano > anoAtual) {
      throw new Error("Ano inválido. O ano não pode ser maior que o ano atual.");
    } else if (typeof ano !== 'number' || isNaN(ano)) {
      throw new Error("O ano deve ser um número válido.");
    }
    return ano;
  }
}

export default VeiculoDto;
