import { Component, OnInit } from '@angular/core';
import { Servico } from 'src/app/interfaces/servico.interface';
import { Cliente } from 'src/app/interfaces/cliente.interface';
import { ServicoService } from 'src/app/services/servico.service';
import { SweetAlertService } from 'src/app/services/sweet-alert.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { FuncionarioServicoService } from 'src/app/services/funcionario-servico.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-listar-servicos',
  templateUrl: './listar-servicos.component.html',
  styleUrls: ['./listar-servicos.component.css']
})
export class ListarServicosComponent implements OnInit {
  pdfSrc: any;

  idFuncionarioUrl: string = "";
  idClienteUrl: string = "";
  routeSub!: Subscription;

  servicos: Servico[] = [];
  relatorios: any;
  servicosFiltrados: Servico[] = [];
  cliente = {} as Cliente;
  filtroPagamento: number = 1;

  isModalDetalhes: boolean = false;
  isModalDeletar: boolean = false;
  isModalPagar: boolean = false;
  servicoModal = {} as Servico;
  pagar: number = 0;

  dropdownState: { [key: string]: boolean } = {};
  servicoIdLast: string = "";
  estadoVar = false;
  idServico: string = "";

  //PAGINATOR
  currentPage = 1;
  pageSize = 20;
  totalServicos = 0;
  totalPages = 0;
  totalPagesFixo = 0;

  isRelatorio: boolean = false;

  pesquisa: string = "";

  constructor(
    private servicoService: ServicoService,
    private funcionarioServicoService: FuncionarioServicoService,
    private sweetAlert: SweetAlertService,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.pegarId();
    this.consultarServicos(1);
  }

  opcaoEventos(evento: {objeto: any; opcao: number}){
    if(evento.opcao === 1){
      this.modalDetalhes(evento.objeto.id);
    }else if(evento.opcao === 2){
      this.idServico = evento.objeto.id;
      this.deletarServico(evento.objeto);
    }
  }

  modalDetalhes(servicoId: string) {
    this.isModalDetalhes = !this.isModalDetalhes;
    if(this.isModalDetalhes){
      const servicoEncontrado = this.servicosFiltrados.find(x => x.id === servicoId);
      if (servicoEncontrado !== undefined) {
        this.servicoModal = servicoEncontrado;
      }
    }
  }

  modalPagar(servico?: Servico){
    this.isModalPagar = !this.isModalPagar;
    if(servico != null)
      this.servicoModal = servico;
  }

  deletarServico(servico?: Servico) {
    if(servico){
      let title = 'Tem certeza que deseja deletar o serviço: ' + servico?.nome;
      let text = servico.pagouTudo ? 'O serviço já foi pago.' : 'O serviço não foi pago totalmente.';
      this.sweetAlert.mostrarAlerta(title, text, 'warning').then((result) => {
        if (result.isConfirmed) {
          this.servicoService.deleteServicoById(servico.id).subscribe(
            (response: any) => {
              const indice = this.servicos.findIndex(x => x.id === servico.id);
              if(indice > -1) this.servicos.splice(indice, 1);
              title = 'Deletado!';
              text = 'Seu serviço e todos os dados dele foram deletados.';
              this.sweetAlert.mostrarConfirmacao(title, text, 'success');
            },
            (error: any) => {
              title = 'Error!';
              text = 'Erro ao deletar serviço.';
              this.sweetAlert.mostrarConfirmacao(title, text, 'error');
              console.error('Erro ao deletar serviço:', error);
            }
          );
        }
      });
    }
  }

  pagarServico(){
    let title = '';
    let text = '';
    this.servicoModal.pagamento = this.servicoModal.pagamento + this.pagar;
    this.servicoService.updateServicoById(this.servicoModal).subscribe(
      (response: any) => {
        this.pagar = 0;
        this.isModalPagar = false;
        title = 'Pago!';
        text = 'Pagamento registrado com sucesso!';
        this.sweetAlert.mostrarConfirmacao(title, text, 'success').then((result) => {
          if (result.isConfirmed) {
            this.imprimir(this.servicoModal.id);
          }
        });
      },
      (error: any) => {
        title = 'Error!';
        text = 'Erro ao fazer pagamento!';
        this.sweetAlert.mostrarConfirmacao(title, text, 'error');
        console.error('Erro ao fazer pagamento:', error);
      }
    );
  }

  //CONFIGURAÇÕES PRA UM PAGINATOR
  consultarServicos(page: number){
    this.currentPage = page;
    if(this.pesquisa.length > 0){
      this.handleSearchChange(this.pesquisa, true);
    }
    else if(this.idFuncionarioUrl?.length > 0){
      this.isRelatorio = true;
      this.funcionarioServicoService.getServicosByIdFuncionario(this.currentPage, this.pageSize, this.idFuncionarioUrl).subscribe((res) => {
        //this.relatorios = res;
        this.relatorios = res.servicos;
        this.totalServicos = res.total;
        this.totalPages = Math.ceil(this.totalServicos / this.pageSize);
        this.relatorios.forEach((element: any) => {
          this.servicos.push(element.servico);
        });
      });
    }else if(this.idClienteUrl?.length > 0) {
      this.servicoService.getServicosIdProprietarioPage(this.currentPage, this.pageSize, this.idClienteUrl).subscribe((res) => {
        this.servicos = res.servicos;
        this.servicosFiltrados = this.servicos;
        this.totalServicos = res.total;
        this.totalPages = Math.ceil(this.totalServicos / this.pageSize);
      })
    }
    else{
      this.servicoService.getServicosPage(this.currentPage, this.pageSize, this.filtroPagamento).subscribe((res) => {
        this.servicos = res.servicos;
        this.servicosFiltrados = this.servicos;
        this.totalServicos = res.total;
        this.totalPages = Math.ceil(this.totalServicos / this.pageSize);
        this.totalPagesFixo = this.totalPages;
      });
    }
  }

  pegarId(){
    this.idFuncionarioUrl = this.route.snapshot.paramMap.get('funcionarioId') ?? '';
    this.idClienteUrl = this.route.snapshot.paramMap.get('clienteId') ?? '';
    console.log(this.idFuncionarioUrl)
    console.log(this.idClienteUrl)
  }

  handleSearchChange(value: string, botao = false) {
    if(!botao){
      this.currentPage = 1;
    }
    if(value == "resetar"){
      this.pesquisa = "";
      value = "";
      this.consultarServicos(1);
    }
    if (value.length >= 3) {
      this.servicoService.getServicoByProprietario(this.currentPage, this.pageSize, this.filtroPagamento, value).subscribe(
        res => {
          this.servicosFiltrados = res.servicos;
          this.totalServicos = res.total;
          this.totalPages = Math.ceil(this.totalServicos / this.pageSize);
          this.pesquisa = value;
        },
        erro => console.error(erro)
      );
    } else {
      this.servicosFiltrados = this.servicos;
      this.pesquisa = "";
      this.totalPages = this.totalPagesFixo;
    }
  }

  imprimir(id: string){
    this.servicoService.imprimir(id).subscribe((res) => {
      const file = new Blob([res], { type: 'application/pdf' });
      const fileURL =  URL.createObjectURL(file);
      this.pdfSrc = this.sanitizer.bypassSecurityTrustResourceUrl(fileURL);
      window.open(fileURL, '_blank'); // Isso irá abrir o PDF em uma nova aba
    });;
  }

}
