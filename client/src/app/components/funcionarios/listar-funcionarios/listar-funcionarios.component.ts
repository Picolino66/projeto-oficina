import { Component, OnInit } from '@angular/core';
import { FuncionarioService } from 'src/app/services/funcionario.service';
import { Funcionario } from 'src/app/interfaces/funcionario.interface';
import { SweetAlertService } from 'src/app/services/sweet-alert.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listar-funcionarios',
  templateUrl: './listar-funcionarios.component.html',
  styleUrls: ['./listar-funcionarios.component.css']
})

export class ListarFuncionariosComponent implements OnInit {
  funcionarios: Funcionario[] = [];
  funcionariosFiltrados: Funcionario[] = [];

  isModalDetalhes: boolean = false;
  isModalDeletar: boolean = false;
  funcionarioModal = {} as Funcionario;

  dropdownState: { [key: string]: boolean } = {};
  funcionarioIdLast: string = "";
  estadoVar = false;

  idFuncionario: string = "";

  //PAGINATOR
  currentPage = 1;
  pageSize = 20;
  totalFuncionarios = 0;
  totalPages = 0;

  constructor(
    private funcionariosService: FuncionarioService,
    private sweetAlert: SweetAlertService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.consultarFuncionarios(1);
  }

  opcaoEventos(evento: {objeto: any; opcao: number}){
    if(evento.opcao === 1){
      this.modalDetalhes(evento.objeto.id);
    }else if(evento.opcao === 2){
      this.idFuncionario = evento.objeto.id;
      this.deletarFuncionario(evento.objeto);
    }
  }

  modalDetalhes(funcionarioId: string) {
    this.isModalDetalhes = !this.isModalDetalhes;
    if(this.isModalDetalhes){
      const funcionarioEncontrado = this.funcionarios.find(x => x.id === funcionarioId);
      if (funcionarioEncontrado !== undefined) {
        this.funcionarioModal = funcionarioEncontrado;
      }
    }
  }

  deletarFuncionario(funcionario?: Funcionario) {
    if(funcionario){
      let title = 'Tem certeza que deseja deletar o funcionário: ' + funcionario?.nome;
      let text = 'O funcionário possui ' + funcionario.servicos.length + ' serviços.';
      this.sweetAlert.mostrarAlerta(title, text, 'warning').then((result) => {
        if (result.isConfirmed) {
          this.funcionariosService.deleteFuncionarioById(funcionario.id).subscribe(
            (response: any) => {
              const indice = this.funcionarios.findIndex(x => x.id === funcionario.id);
              if(indice > -1) this.funcionarios.splice(indice, 1);
              title = 'Deletado!';
              text = 'Seu funcionário e todos os dados dele foram deletados.';
              this.sweetAlert.mostrarConfirmacao(title, text, 'success');
            },
            (error: any) => {
              title = 'Error!';
              text = 'Erro ao deletar funcionario.';
              this.sweetAlert.mostrarConfirmacao(title, text, 'error');
              console.error('Erro ao deletar funcionario:', error);
            }
          );
        }
      });
    }
  }

  //CONFIGURAÇÕES PRA UM PAGINATOR
  consultarFuncionarios(page: number){
    this.currentPage = page;
    this.funcionariosService.getFuncionarioPage(this.currentPage, this.pageSize).subscribe((res) => {
      this.funcionarios = res.funcionarios;
      this.funcionariosFiltrados = this.funcionarios;
      this.totalFuncionarios = res.total;
      this.totalPages = Math.ceil(this.totalFuncionarios / this.pageSize);
    });
  }

  handleSearchChange(value: string) {
    if (value.length >= 3) {
      this.funcionariosService.getFuncionarioByName(value).subscribe(
        dados => this.funcionariosFiltrados = dados,
        erro => console.error(erro)
      );
    } else {
      this.funcionariosFiltrados = this.funcionarios;
    }
  }

  goRelatorio(id: string){
    this.router.navigate(['/relatorio/'+id]);
  }

}
