import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VeiculoService } from '../../../services/veiculo.service';
import { Veiculo } from '../../../interfaces/veiculo.interface';
import { ClienteService } from 'src/app/services/cliente.service';
import { Cliente } from 'src/app/interfaces/cliente.interface';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { SweetAlertService } from 'src/app/services/sweet-alert.service';
import { AutoCompleteSelectorComponent } from 'src/app/utils/auto-complete-selector/auto-complete-selector.component';
@Component({
  selector: 'app-alterar-criar-veiculo',
  templateUrl: './alterar-criar-veiculo.component.html',
  styleUrls: ['./alterar-criar-veiculo.component.css']
})

export class AlterarCriarVeiculoComponent implements OnInit {
  @ViewChild(AutoCompleteSelectorComponent) autoComplete!: AutoCompleteSelectorComponent;

  termoBusca = '';
  clientesFiltrados: Cliente[] = [];
  veiculoForm!: FormGroup;
  submit: boolean = false;
  nomeClienteSelecionado: string = '';

  constructor(
    private fb: FormBuilder,
    private veiculoService: VeiculoService,
    private clientesService: ClienteService,
    private router: Router,
    private dataService: DataService,
    private sweetAlert: SweetAlertService
  ) {
    this.veiculoForm = this.fb.group({
      id: [''],
      clienteId: ['', Validators.required],
      clienteNome: [''],
      tipo: [''],
      modelo: [''],
      marca: [''],
      placa: [''],
      cor: [''],
      ano: ['']
    });
  }

  ngOnInit() {
    this.dataService.getData<[Veiculo, string]>().subscribe(async (veiculo) => {
      if (veiculo && veiculo[1].includes("veiculo")) {
        this.nomeClienteSelecionado = veiculo[0].cliente.nome;
        await this.veiculoForm.patchValue(veiculo[0]);
        await this.autoComplete.selecionarItem(veiculo[0].cliente);
      }
    });
  }

  onSubmit() {
    this.submit = true;
    let title = '';
    let text = '';
    if (this.veiculoForm.valid) {
      const veiculoData: Veiculo = this.veiculoForm.value;
      if(veiculoData.id && veiculoData.id.length > 0){
        title = 'Tem certeza que deseja alterar o veiculo do proprietário: ' + veiculoData?.clienteNome;
        this.sweetAlert.mostrarAlerta(title, text, 'warning').then((result) => {
          if (result.isConfirmed) {
            this.veiculoService.updateVeiculoById(veiculoData).subscribe(
              (response: any) => {
                title = 'Alterado!';
                text = 'Veículo do proprietário ' + veiculoData.clienteNome + ' alterado com sucesso!';
                this.sweetAlert.mostrarConfirmacao(title, text, 'success').then((result) => {
                  this.router.navigate(['/veiculo/listar']);
                });
              },
              (error: any) => {
                title = 'Error!';
                text = 'Veículo do proprietário ' + veiculoData.clienteNome + ' não foi alterado! \n' + error.error.error;
                this.sweetAlert.mostrarConfirmacao(title, text, 'warning');
                console.error('Erro ao alterar veiculo:', error);
              }
            );
          }
        });
      }else{
        this.veiculoService.createVeiculo(veiculoData).subscribe(
          (response: any) => {
            title = 'Salvo!';
            text = 'Veículo do proprietário ' + veiculoData.clienteNome + ' salvo com sucesso!';
            this.sweetAlert.mostrarConfirmacao(title, text, 'success').then((result) => {
              this.router.navigate(['/veiculo/listar']);
            });
          },
          (error: any) => {
            title = 'Error!';
            text = 'Veículo do proprietário ' + veiculoData.clienteNome + ' não foi salvo! \n' + error.error.error;
            this.sweetAlert.mostrarConfirmacao(title, text, 'warning');
            console.error('Erro ao salvar o veiculo:', error);
          }
        );
      }
    } else {
      title = 'Error!';
      text = 'Informe o proprietário!';
      this.sweetAlert.mostrarConfirmacao(title, text, 'warning');
      console.log("Formulário inválido");
    }
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

  onClienteSelecionado(cliente: any) {
    this.termoBusca = cliente.nome;
    this.veiculoForm!.get('clienteId')?.setValue(cliente.id);
    this.veiculoForm!.get('clienteNome')?.setValue(this.termoBusca);
    this.clientesFiltrados = [];
  }
}
