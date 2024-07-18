import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ClienteService } from 'src/app/services/cliente.service';
import { Cliente } from 'src/app/interfaces/cliente.interface';
import { Veiculo } from 'src/app/interfaces/veiculo.interface';
import { Funcionario } from 'src/app/interfaces/funcionario.interface';
import { FuncionarioService } from 'src/app/services/funcionario.service';
import { ServicoService } from 'src/app/services/servico.service';
import { Router } from '@angular/router';
import { Servico } from 'src/app/interfaces/servico.interface';
import { SweetAlertService } from 'src/app/services/sweet-alert.service';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { DataService } from 'src/app/services/data.service';
import { VeiculoService } from 'src/app/services/veiculo.service';
import { AutoCompleteSelectorComponent } from 'src/app/utils/auto-complete-selector/auto-complete-selector.component';

@Component({
  selector: 'app-alterar-criar-servico',
  templateUrl: './alterar-criar-servico.component.html',
  styleUrls: ['./alterar-criar-servico.component.css']
})
export class AlterarCriarServicoComponent implements OnInit {
  @ViewChild(AutoCompleteSelectorComponent) autoComplete!: AutoCompleteSelectorComponent;

  pdfSrc: any;
  termoBusca = '';
  servicoForm!: FormGroup;
  clientesFiltrados: Cliente[] = [];
  funcionarios: Funcionario[] = [];
  veiculos: Veiculo[] = [];
  selecionado: number | null = null;
  submit: boolean = false;
  text: string = "";
  Editor = ClassicEditor;
  nomeClienteSelecionado: string = '';

  constructor(
    private fb: FormBuilder,
    private clientesService: ClienteService,
    private funcionarioService: FuncionarioService,
    private servicoService: ServicoService,
    private router: Router,
    private dataService: DataService,
    private sweetAlert: SweetAlertService,
    private sanitizer: DomSanitizer,
    private veiculoService: VeiculoService
  ) {
    this.servicoForm = this.fb.group({
      id: [''],
      veiculoId: ['', Validators.required],
      clienteId: ['', Validators.required],
      clienteNome: [''],
      km: ['', Validators.required],
      nome: ['', Validators.required],
      preco: ['', Validators.required],
      placa: ['', Validators.required],
      descricao: ['', Validators.required],
      comissaoFuncionarios: this.fb.array([]),
    });
  }

  ngOnInit(): void {
    this.getFuncionarios();
    this.adicionarComissaoFuncionario();
    this.dataService.getData<[Servico, string]>().subscribe(servico => {
      if (servico && servico[1].includes("servico")) {
        this.nomeClienteSelecionado = servico[0].cliente.nome;
        this.veiculoService.getVeiculosByIdCliente(servico[0].cliente.id).subscribe(
          (response: any) => {
            servico[0].cliente.veiculos = response;
            this.autoComplete.selecionarItem(servico[0].cliente);
          },
          (error: any) => {
          }
        );
        this.servicoForm.patchValue(servico[0]);
      }
    });
  }

  get comissaoFuncionarios() {
    return this.servicoForm.get('comissaoFuncionarios') as FormArray;
  }

  adicionarComissaoFuncionario() {
    const linha = this.fb.group({
      funcionarioId: ['', Validators.required],
      comissaoPerc: ['', Validators.required],
      comissaoMone: ['', Validators.required]
    });
    this.comissaoFuncionarios.push(linha);
  }

  removerComissaoFuncionario(index: number) {
    this.comissaoFuncionarios.removeAt(index);
  }

  onSubmit() {
    this.submit = true;
    let title = '';
    let text = '';
    if (this.servicoForm.valid) {
      const servicoData: Servico = this.servicoForm.value;
      if(!servicoData.pagamento){
        servicoData.pagamento = 0;
      }
      if(servicoData.id && servicoData.id.length > 0){
        title = 'Tem certeza que deseja alterar o serviço: ' + servicoData?.nome;
        this.sweetAlert.mostrarAlerta(title, text, 'warning').then((result) => {
          if (result.isConfirmed) {
            this.servicoService.updateServicoById(servicoData).subscribe(
              (response: any) => {
                title = 'Alterado!';
                text = servicoData.nome + ' alterado com sucesso!';
                this.sweetAlert.mostrarConfirmacao(title, text, 'success').then((result) => {
                  this.imprimir(response.id);
                  this.router.navigate(['/servico/listar']);
                });
              },
              (error: any) => {
                title = 'Error!';
                text = servicoData.nome + ' não foi alterado!';
                this.sweetAlert.mostrarConfirmacao(title, text, 'warning');
                console.error('Erro ao alterar serviço:', error);
              }
            );
          }
        });
      }else{
        this.servicoService.createServico(servicoData).subscribe(
          (response: any) => {
            title = 'Salvo!';
            text = servicoData.nome + ' salvo com sucesso!';
            this.sweetAlert.mostrarConfirmacao(title, text, 'success').then((result) => {
              this.imprimir(response.id);
              this.router.navigate(['/servico/listar']);
            });
          },
          (error: any) => {
            title = 'Error!';
            text = servicoData.nome + ' não foi salvo!';
            this.sweetAlert.mostrarConfirmacao(title, text, 'warning');
            console.error('Erro ao salvar o serviço:', error);
          }
        );
      }
    } else {
      title = 'Error!';
      text = 'Preencha o formulário completamente.';
      this.sweetAlert.mostrarConfirmacao(title, text, 'warning');
    }
  }

  getFuncionarios(){
    this.funcionarioService.getFuncionarios().subscribe(
      dados => this.funcionarios = dados,
      erro => console.error(erro)
    );
  }

  buscarClientes(termo: string) {
    if (termo.length >= 3) {
      this.clientesService.getClienteByName(termo).subscribe(
        dados => this.clientesFiltrados = dados,
        erro => console.error(erro)
      );
    } else {
      this.clientesFiltrados = [];
    }
  }

  onClienteSelecionado(cliente: Cliente) {
    this.termoBusca = cliente.nome;
    this.servicoForm!.get('clienteId')?.setValue(cliente.id);
    this.servicoForm!.get('clienteNome')?.setValue(this.termoBusca);
    this.veiculos = cliente.veiculos;
    this.clientesFiltrados = [];
  }

  onVeiculoSelecionado(event: any) {
    const partes = event.target.value.split(':');
    const resultado = partes[1].trim();
    const veiculo = this.veiculos.find((x: any) => x.id == resultado);
    this.servicoForm!.get('placa')?.setValue(veiculo?.placa);
  }

  calculoComissoes(event: any, index?: number) {
    const valor = Number(event.target.value);
    const idCampo = event.target.id;
    const preco = Number(this.servicoForm!.get('preco')?.value);
    if(typeof index === 'number'){
      const linhaFormGroup = (this.servicoForm.get('comissaoFuncionarios') as FormArray).at(index);
      if(idCampo.includes('comissaoPerc')){
        const comissaoMone = preco * valor / 100;
        linhaFormGroup.get('comissaoMone')?.setValue(comissaoMone);
      }else if(idCampo.includes('comissaoMone')){
        const comissaoPerc = valor * 100 / preco;
        linhaFormGroup.get('comissaoPerc')?.setValue(comissaoPerc);
      }
    }else if(idCampo == 'preco'){
      const linhasArray = this.servicoForm.get('comissaoFuncionarios') as FormArray;
      linhasArray.controls.forEach((linhaFormGroup) => {
        linhaFormGroup.get('comissaoPerc')?.setValue(0);
        linhaFormGroup.get('comissaoMone')?.setValue(0);
      });
    }
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
