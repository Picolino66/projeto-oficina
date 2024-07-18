import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Servico } from 'src/app/interfaces/servico.interface';
import { ServicoService } from 'src/app/services/servico.service';
import { SweetAlertService } from 'src/app/services/sweet-alert.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  pdfSrc: any;
  //PAGINATOR
  currentPage = 1;
  pageSize = 20;
  totalServicos = 0;
  totalPages = 0;
  totais: any;
  filtroPagamento: number = 3;
  servicos: Servico[] = [];
  servicosFiltrados: Servico[] = [];
  isModalPagar: boolean = false;
  servicoModal = {} as Servico;
  pagar: number = 0;

  constructor(
    private servicoService: ServicoService,
    private sweetAlert: SweetAlertService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.servicoService.getTotalServicos().subscribe((res) => {
      this.totais = res;
    });
    this.consultarServicos(1);
  }

  consultarServicos(page: number){
    this.currentPage = page;
    this.servicoService.getServicosPage(this.currentPage, this.pageSize, this.filtroPagamento).subscribe((res) => {
      this.servicos = res.servicos;
      this.servicosFiltrados = this.servicos;
      this.totalServicos = res.total;
      this.totalPages = Math.ceil(this.totalServicos / this.pageSize);
    });
  }

  handleSearchChange(value: string) {
    if (value.length >= 3) {
      this.servicoService.getServicoByPlaca(value).subscribe(
        dados => {this.servicosFiltrados = dados; console.log(dados);},
        erro => console.error(erro)
      );
    } else {
      this.servicosFiltrados = this.servicos;
    }
  }

  modalPagar(servico?: Servico){
    this.isModalPagar = !this.isModalPagar;
    if(servico != null)
      this.servicoModal = servico;
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

  imprimir(id: string){
    this.servicoService.imprimir(id).subscribe((res) => {
      const file = new Blob([res], { type: 'application/pdf' });
      const fileURL =  URL.createObjectURL(file);
      this.pdfSrc = this.sanitizer.bypassSecurityTrustResourceUrl(fileURL);
      window.open(fileURL, '_blank'); // Isso irá abrir o PDF em uma nova aba
    });;
    console.log(this.pdfSrc)
  }
}
