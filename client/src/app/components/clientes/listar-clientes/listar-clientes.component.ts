import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { ClienteService } from 'src/app/services/cliente.service';
import { Cliente } from 'src/app/interfaces/cliente.interface';
import { SweetAlertService } from 'src/app/services/sweet-alert.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listar-clientes',
  templateUrl: './listar-clientes.component.html',
  styleUrls: ['./listar-clientes.component.css']
})
export class ListarClientesComponent implements OnInit {
  @ViewChild('scrollContainer') scrollContainer!: ElementRef;

  clientes: Cliente[] = [];
  clientesFiltrados: Cliente[] = [];

  //MODAIS
  isModalDetalhes: boolean = false;
  clienteModal = {} as Cliente;

  //DROPDOWN
  dropdownState: { [key: string]: boolean } = {};
  clienteIdLast: string = "";
  idCliente: string = "";

  //PAGINATOR
  currentPage = 1;
  pageSize = 20;
  totalClientes = 0;
  totalPages = 0;
  totalPagesFixo = 0;

  pesquisa: string = "";

  constructor(
    private clientesService: ClienteService,
    private sweetAlert: SweetAlertService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.consultarClientes(1);
  }

  opcaoEventos(evento: {objeto: any; opcao: number}){
    if(evento.opcao === 1){
      this.modalDetalhes(evento.objeto.id);
    }else if(evento.opcao === 2){
      this.deletarCliente(evento.objeto);
    }
  }

  modalDetalhes(clienteId: string) {
    this.isModalDetalhes = !this.isModalDetalhes;
    if(this.isModalDetalhes){
      const clienteEncontrado = this.clientesFiltrados.find(x => x.id === clienteId);
      if (clienteEncontrado !== undefined) {
        this.clienteModal = clienteEncontrado;
      }
    }
  }

  deletarCliente(cliente?: Cliente){
    if(cliente){
      let title = 'Tem certeza que deseja deletar o cliente: ' + cliente?.nome;
      let text = 'O cliente possui ' + cliente.veiculos.length + ' veículos e já foi feito ' + cliente.servicos.length + ' serviços para o cliente.';
      this.sweetAlert.mostrarAlerta(title, text, 'warning').then((result) => {
        if (result.isConfirmed) {
          this.clientesService.deleteClienteById(cliente.id).subscribe(
            (response: any) => {
              const indice = this.clientes.findIndex(x => x.id === cliente.id);
              if(indice > -1) this.clientes.splice(indice, 1);
              title = 'Deletado!';
              text = 'Seu cliente e todos os dados dele foram deletados.';
              this.sweetAlert.mostrarConfirmacao(title, text, 'success');
            },
            (error: any) => {
              title = 'Error!';
              text = 'Erro ao deletar cliente.';
              this.sweetAlert.mostrarConfirmacao(title, text, 'error');
              console.error('Erro ao deletar cliente:', error);
            }
          );
        }
      });
    }
  }

  //CONFIGURAÇÕES PRA UM PAGINATOR
  consultarClientes(page: number){
    this.currentPage = page;
    if(this.pesquisa.length > 0){
      this.handleSearchChange(this.pesquisa, true);
    }else{
      this.clientesService.getClientesPage(this.currentPage, this.pageSize).subscribe((res) => {
        this.clientes = this.ordenacaoNome(res.clientes)
        this.clientesFiltrados = this.clientes;
        this.totalClientes = res.total;
        this.totalPages = Math.ceil(this.totalClientes / this.pageSize);
        this.totalPagesFixo = this.totalPages;
      });
    }
  }

  handleSearchChange(value: string, botao = false) {
    if(!botao){
      this.currentPage = 1;
    }
    if(value == "resetar"){
      this.pesquisa = "";
      value = "";
      this.consultarClientes(1);
    }
    if (value.length >= 3) {
      this.clientesService.getClientePageByName(value, this.currentPage, this.pageSize).subscribe((res) => {
        this.clientesFiltrados = this.ordenacaoNome(res.clientes);
        this.totalClientes = res.total;
        this.totalPages = Math.ceil(this.totalClientes / this.pageSize);
        this.pesquisa = value;
      },
        erro => console.error(erro)
      );
    } else {
      this.clientesFiltrados = this.clientes;
      this.pesquisa = "";
      this.totalPages = this.totalPagesFixo;
    }
  }

  ordenacaoNome(clientes: Cliente[]){
    return clientes.sort((a, b) => {
      if (a.nome < b.nome) {
        return -1;
      }
      if (a.nome > b.nome) {
        return 1;
      }
      return 0;
    });
  }

  redirecionar(id: string, rota: string){
    this.router.navigate([rota+"/"+id]);
  }
}
