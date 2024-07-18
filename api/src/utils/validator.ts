class Validator {
    static validateNome(nome: string) {
      if (!nome || nome.trim() === '') {
        throw new Error('Nome é um campo obrigatório.');
      }
      return nome;
    }
  
    static validateTelefone(telefone: string) {
      if (!telefone || telefone.trim() === '') {
        return telefone;
      }
      // Verifica se o telefone possui 11 dígitos
      if (telefone.replace(/\D/g, '').length > 11 || telefone.replace(/\D/g, '').length < 10) {
        throw new Error('Telefone deve conter 11 dígitos.');
      }
      return telefone;
    }
    // Você pode adicionar mais métodos de validação genéricos conforme necessário
    static validateCpf(cpf: string) {
      if (!cpf || cpf.trim() === '') {
        return cpf;
      }
      // Verifica se o CPF possui 11 dígitos
      if (cpf.replace(/\D/g, '').length !== 11) {
        throw new Error('CPF deve conter 11 dígitos.');
      }
      return cpf.replace(/\D/g, '');
    }

    static validateLogradouro(logradouro: string) {
      return logradouro;
    }

    static validateNumero(numero: string) {
      return numero;
    }

    static validateComplemento(complemento: string): string {
      return complemento;
    }
  
    static validateBairro(bairro: string) {
      return bairro;
    }
  
    static validateCidade(cidade: string) {
      return cidade;
    }
  
    static validateCEP(cep: string) {
      return cep;
    }

  }
  
  export default Validator;