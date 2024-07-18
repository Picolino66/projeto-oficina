import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClienteService } from '../../../services/cliente.service';
import { Cliente } from '../../../interfaces/cliente.interface';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { SweetAlertService } from 'src/app/services/sweet-alert.service';

@Component({
  selector: 'app-alterar-criar-cliente',
  templateUrl: './alterar-criar-cliente.component.html',
  styleUrls: ['./alterar-criar-cliente.component.css']
})
export class AlterarCriarClienteComponent {
  clienteForm!: FormGroup;
  submit: boolean = false;

  constructor(
    private fb: FormBuilder,
    private clienteService: ClienteService,
    private router: Router,
    private dataService: DataService,
    private sweetAlert: SweetAlertService
  ) { }

  ngOnInit() {
    this.clienteForm = this.fb.group({
      id: [''],
      nome: ['', Validators.required],
      cpf: [''],
      telefone: [''],
      logradouro: [''],
      numero: [''],
      complemento: [''],
      bairro: [''],
      cidade: [''],
      cep: ['']
    });

    this.dataService.getData<[Cliente, string]>().subscribe(cliente => {
      if (cliente && cliente[1].includes("cliente")) {
        this.clienteForm.patchValue(cliente[0]);
      }
    });
  }

  onSubmit() {
    this.submit = true;
    if (this.clienteForm.valid) {
      const clienteData: Cliente = this.clienteForm.value;
      let title = '';
      let text = '';
      if(clienteData.id && clienteData.id.length > 0){
        title = 'Tem certeza que deseja alterar o cliente: ' + clienteData?.nome;
        this.sweetAlert.mostrarAlerta(title, text, 'warning').then((result) => {
          if (result.isConfirmed) {
            this.clienteService.updateClienteById(clienteData).subscribe(
              (response: any) => {
                title = 'Alterado!';
                text = clienteData.nome + ' alterado com sucesso!';
                this.sweetAlert.mostrarConfirmacao(title, text, 'success').then((result) => {
                  this.router.navigate(['/cliente/listar']);
                });
              },
              (error: any) => {
                title = 'Error!';
                text = clienteData.nome + ' não foi alterado!';
                this.sweetAlert.mostrarConfirmacao(title, text, 'warning');
                console.error('Erro ao alterar cliente:', error);
              }
            );
          }
        });
      }else{
        this.clienteService.createCliente(clienteData).subscribe(
          (response: any) => {
            title = 'Salvo!';
            text = clienteData.nome + ' salvo com sucesso!';
            this.sweetAlert.mostrarConfirmacao(title, text, 'success').then((result) => {
              this.router.navigate(['/cliente/listar']);
            });
          },
          (error: any) => {
            title = 'Error!';
            text = clienteData.nome + ' não foi salvo!';
            this.sweetAlert.mostrarConfirmacao(title, text, 'warning');
            console.error('Erro ao salvar o cliente:', error);
          }
        );
      }
    } else {
      console.log(this.clienteForm);
    }
  }

}
