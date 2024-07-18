interface FuncionarioServicoDTO {
    funcionarioId: string;
    servicoId: string;
    comissaoPerc: number;
    comissaoMone: number;
  }
  
  class FuncionarioServicoDTO {
    constructor(data: FuncionarioServicoDTO, servicoId?: string) {
      this.funcionarioId = this.validateFuncionarioId(data.funcionarioId);
      this.servicoId = servicoId ? this.validateServicoId(servicoId) : this.validateServicoId(data.servicoId);
      this.comissaoPerc = this.validateComissaoPorcentagem(data.comissaoPerc);
      this.comissaoMone = this.validateComissaoValor(data.comissaoMone);
    }
  
    private validateFuncionarioId(funcionarioId: string) {
      if (!funcionarioId || funcionarioId.trim() === '') {
        throw new Error('O ID do funcionário é um campo obrigatório.');
      }
      return funcionarioId;
    }
  
    private validateServicoId(servicoId: string) {
      if (!servicoId || servicoId.trim() === '') {
        throw new Error('O ID do serviço é um campo obrigatório.');
      }
      return servicoId;
    }
  
    private validateComissaoPorcentagem(comissaoPorcentagem: number) {
      // Adicione aqui a lógica de validação da comissão porcentagem, se necessário
      return comissaoPorcentagem;
    }
  
    private validateComissaoValor(comissaoValor: number) {
      // Adicione aqui a lógica de validação da comissão valor, se necessário
      return comissaoValor;
    }
  }
  
  export default FuncionarioServicoDTO;
  