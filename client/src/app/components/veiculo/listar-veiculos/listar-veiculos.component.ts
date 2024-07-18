import { Component, OnInit } from '@angular/core';
import { VeiculoService } from 'src/app/services/veiculo.service';
import { Veiculo } from 'src/app/interfaces/veiculo.interface';
import { Cliente } from 'src/app/interfaces/cliente.interface';
import { ActivatedRoute } from '@angular/router';
import { SweetAlertService } from 'src/app/services/sweet-alert.service';

@Component({
  selector: 'app-listar-veiculos',
  templateUrl: './listar-veiculos.component.html',
  styleUrls: ['./listar-veiculos.component.css']
})

export class ListarVeiculosComponent implements OnInit {
  idClienteUrl: string = "";
  veiculos: Veiculo[] = [];
  veiculosFiltrados: Veiculo[] = [];
  cliente = {} as Cliente;

  isModalDetalhes: boolean = false;
  isModalDeletar: boolean = false;
  veiculoModal = {} as Veiculo;

  dropdownState: { [key: string]: boolean } = {};
  veiculoIdLast: string = "";
  estadoVar = false;
  idVeiculo: string = "";

  //PAGINATOR
  currentPage = 1;
  pageSize = 20;
  totalVeiculos = 0;
  totalPages = 0;
  totalPagesFixo = 0;

  pesquisa: string = "";

  constructor(
    private veiculosService: VeiculoService,
    private sweetAlert: SweetAlertService,
    private route: ActivatedRoute
  ) {}

  async ngOnInit(): Promise<void> {
    await this.pegarId();
    this.consultarVeiculos(1);
  }

  opcaoEventos(evento: {objeto: any; opcao: number}){
    if(evento.opcao === 1){
      this.modalDetalhes(evento.objeto.id);
    }else if(evento.opcao === 2){
      this.idVeiculo = evento.objeto.id;
      this.deletarVeiculo(evento.objeto);
    }
  }

  modalDetalhes(veiculoId: string) {
    this.isModalDetalhes = !this.isModalDetalhes;
    if(this.isModalDetalhes){
      const veiculoEncontrado = this.veiculos.find(x => x.id === veiculoId);
      if (veiculoEncontrado !== undefined) {
        this.veiculoModal = veiculoEncontrado;
      }
    }
  }

  deletarVeiculo(veiculo?: Veiculo) {
    if(veiculo){
      let title = 'Tem certeza que deseja deletar o veiculo: ' + veiculo?.placa;
      let text = '';
      this.sweetAlert.mostrarAlerta(title, text, 'warning').then((result) => {
        if (result.isConfirmed) {
          this.veiculosService.deleteVeiculoById(veiculo.id).subscribe(
            (response: any) => {
              const indice = this.veiculos.findIndex(x => x.id === veiculo.id);
              if(indice > -1) this.veiculos.splice(indice, 1);
              title = 'Deletado!';
              text = 'Seu veiculo e todos os dados dele foram deletados.';
              this.sweetAlert.mostrarConfirmacao(title, text, 'success');
            },
            (error: any) => {
              title = 'Error!';
              text = 'Erro ao deletar veiculo.';
              this.sweetAlert.mostrarConfirmacao(title, text, 'error');
              console.error('Erro ao deletar veiculo:', error);
            }
          );
        }
      });
    }
  }

  //CONFIGURAÇÕES PRA UM PAGINATOR
  consultarVeiculos(page: number){
    this.currentPage = page;
    if(this.pesquisa.length > 0){
      this.handleSearchChange(this.pesquisa, true);
    }
    else if(this.idClienteUrl.length > 0){
      this.veiculosService.getVeiculosIdPage(this.currentPage, this.pageSize, this.idClienteUrl).subscribe((res) => {
        this.veiculos = this.ordenacaoNome(res.veiculos);
        this.veiculosFiltrados = this.veiculos;
        this.totalVeiculos = res.total;
        this.totalPages = Math.ceil(this.totalVeiculos / this.pageSize);
      });
    }else{
      this.veiculosService.getVeiculosPage(this.currentPage, this.pageSize).subscribe((res) => {
        this.veiculos = this.ordenacaoNome(res.veiculos);
        this.veiculosFiltrados = this.veiculos;
        this.totalVeiculos = res.total;
        this.totalPages = Math.ceil(this.totalVeiculos / this.pageSize);
        this.totalPagesFixo = this.totalPages;
      });
    }
  }

  ordenacaoNome(veiculos: Veiculo[]){
    return veiculos.sort((a, b) => {
      if (a.cliente.nome < b.cliente.nome) {
        return -1;
      }
      if (a.cliente.nome > b.cliente.nome) {
        return 1;
      }
      return 0;
    });
  }

  handleSearchChange(value: string, botao = false) {
    if(!botao){
      this.currentPage = 1;
    }
    if(value == "resetar"){
      this.pesquisa = "";
      value = "";
      this.consultarVeiculos(1);
    }
    if (value.length >= 3) {
      if(this.idClienteUrl.length > 0) {
        this.veiculosFiltrados = this.veiculosFiltrados.filter(x => x.placa.toUpperCase().includes(value.toUpperCase()));
        this.totalPages = Math.ceil(this.totalVeiculos / this.pageSize);
        this.pesquisa = value;
      }
      else {
        this.veiculosService.getVeiculoByNome(value, this.currentPage, this.pageSize).subscribe( (dados) => {
            this.veiculosFiltrados = this.ordenacaoNome(dados.veiculos);
            this.totalVeiculos = dados.total;
            this.totalPages = Math.ceil(this.totalVeiculos / this.pageSize);
            this.pesquisa = value;
          },
          erro => console.error(erro)
        );
      }
    } else {
      this.veiculosFiltrados = this.veiculos;
      this.pesquisa = "";
      this.totalPages = this.totalPagesFixo;
    }
  }

  pegarId(){
    this.idClienteUrl = this.route.snapshot.paramMap.get('id') ?? '';
  }

}
