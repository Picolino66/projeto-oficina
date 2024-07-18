// VeiculoDto.ts
interface OrcamentoDto {
  descricao: string;
  cliente: string;
}

class OrcamentoDto {
  constructor(data: OrcamentoDto) {
    this.descricao = this.validateDescricaoServico(data.descricao);
    this.cliente = this.validateResponsavel(data.cliente);
  }

  private validateDescricaoServico(descricao_servico: string) {
    if (!descricao_servico || descricao_servico.trim() === '') {
      throw new Error("A descricao do serviço é um campo obrigatório.");
    }
    return descricao_servico;
  }

  private validateResponsavel(responsavel: string) {
    if (!responsavel) {
      throw new Error("Responsavel é um campo obrigatório.");
    }
    return responsavel;
  }
  
}

export default OrcamentoDto;
