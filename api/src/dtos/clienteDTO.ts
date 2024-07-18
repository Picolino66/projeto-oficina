// ClienteDTO.ts
import Validator from '../utils/validator';
interface ClienteDTO {
  nome: string;
  cpf: string;
  telefone: string;
  logradouro: string;
  numero: string;
  complemento: string;
  bairro: string;
  cidade: string;
  cep: string;
}

class ClienteDTO {
  constructor(data: ClienteDTO) {
    this.nome = Validator.validateNome(data.nome);
    this.cpf = Validator.validateCpf(data.cpf);
    this.telefone = Validator.validateTelefone(data.telefone);
    this.logradouro = Validator.validateLogradouro(data.logradouro);
    this.numero = Validator.validateNumero(data.numero);
    this.complemento = Validator.validateComplemento(data.complemento);
    this.bairro = Validator.validateBairro(data.bairro);
    this.cidade = Validator.validateCidade(data.cidade);
    this.cep = Validator.validateCEP(data.cep);
  }
}

export default ClienteDTO;
