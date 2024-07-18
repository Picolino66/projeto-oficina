import { Component, OnInit } from '@angular/core';
import { OrcamentoService } from 'src/app/services/orcamento.service';
import { Orcamento } from 'src/app/interfaces/orcamento.interface';
import { SweetAlertService } from 'src/app/services/sweet-alert.service';

@Component({
  selector: 'app-listar-orcamentos',
  templateUrl: './listar-orcamentos.component.html',
  styleUrls: ['./listar-orcamentos.component.css']
})
export class ListarOrcamentosComponent implements OnInit {

  orcamentos: Orcamento[] = [];
  isModalDetalhes: boolean = false;
  isModalDeletar: boolean = false;
  orcamentoModal = {} as Orcamento;
  dropdownState: { [key: string]: boolean } = {};
  orcamentoIdLast: string = "";
  estadoVar = false;
  idOrcamento: string = "";

  constructor(
    private orcamentosService: OrcamentoService,
    private sweetAlert: SweetAlertService
  ) {}

  ngOnInit(): void {
    this.orcamentosService.getOrcamentos().subscribe((orcamentos) => {
      this.orcamentos = orcamentos;
    });

  }

  opcaoEventos(evento: {objeto: any; opcao: number}){
    if(evento.opcao === 1){
      this.modalDetalhes(evento.objeto.id);
    }else if(evento.opcao === 2){
      this.idOrcamento = evento.objeto.id;
      this.deletarOrcamento(evento.objeto);
    }
  }

  modalDetalhes(orcamentoId: string) {
    this.isModalDetalhes = !this.isModalDetalhes;
    if(this.isModalDetalhes){
      const orcamentoEncontrado = this.orcamentos.find(x => x.id === orcamentoId);
      if (orcamentoEncontrado !== undefined) {
        this.orcamentoModal = orcamentoEncontrado;
      }
    }
  }

  deletarOrcamento(orcamento?: Orcamento) {
    if(orcamento){
      let title = 'Tem certeza que deseja deletar o orcamento';
      let text = '';
      this.sweetAlert.mostrarAlerta(title, text, 'warning').then((result) => {
        if (result.isConfirmed) {
          this.orcamentosService.deleteOrcamentoById(orcamento.id).subscribe(
            (response: any) => {
              const indice = this.orcamentos.findIndex(x => x.id === orcamento.id);
              if(indice > -1) this.orcamentos.splice(indice, 1);
              title = 'Deletado!';
              text = 'Seu orcamento e todos os dados dele foram deletados.';
              this.sweetAlert.mostrarConfirmacao(title, text, 'success');
            },
            (error: any) => {
              title = 'Error!';
              text = 'Erro ao deletar orcamento.';
              this.sweetAlert.mostrarConfirmacao(title, text, 'error');
              console.error('Erro ao deletar orcamento:', error);
            }
          );
        }
      });
    }
  }

}
