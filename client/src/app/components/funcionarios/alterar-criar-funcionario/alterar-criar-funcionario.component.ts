import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FuncionarioService } from '../../../services/funcionario.service';
import { Funcionario } from '../../../interfaces/funcionario.interface';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { SweetAlertService } from 'src/app/services/sweet-alert.service';

@Component({
  selector: 'app-alterar-criar-funcionario',
  templateUrl: './alterar-criar-funcionario.component.html',
  styleUrls: ['./alterar-criar-funcionario.component.css']
})
export class AlterarCriarFuncionarioComponent {
  funcionarioForm!: FormGroup;
  submit: boolean = false;

  constructor(
    private fb: FormBuilder,
    private funcionarioService: FuncionarioService,
    private router: Router,
    private dataService: DataService,
    private sweetAlert: SweetAlertService
  ) { }

  ngOnInit() {
    this.funcionarioForm = this.fb.group({
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

    this.dataService.getData<Funcionario>().subscribe(funcionario => {
      if (funcionario) {
        this.funcionarioForm.patchValue(funcionario);
      }
    });
  }

  onSubmit() {
    this.submit = true;
    if (this.funcionarioForm.valid) {
      const funcionarioData: Funcionario = this.funcionarioForm.value;
      let title = '';
      let text = '';
      if(funcionarioData.id && funcionarioData.id.length > 0){
        title = 'Tem certeza que deseja alterar o funcionario: ' + funcionarioData?.nome;
        this.sweetAlert.mostrarAlerta(title, text, 'warning').then((result) => {
          if (result.isConfirmed) {
            this.funcionarioService.updateFuncionarioById(funcionarioData).subscribe(
              (response: any) => {
                title = 'Alterado!';
                text = funcionarioData.nome + ' alterado com sucesso!';
                this.sweetAlert.mostrarConfirmacao(title, text, 'success').then((result) => {
                  this.router.navigate(['/funcionario/listar']);
                });
              },
              (error: any) => {
                title = 'Error!';
                text = funcionarioData.nome + ' não foi alterado!';
                this.sweetAlert.mostrarConfirmacao(title, text, 'warning');
                console.error('Erro ao alterar funcionario:', error);
              }
            );
          }
        });
      }else{
        this.funcionarioService.createFuncionario(funcionarioData).subscribe(
          (response: any) => {
            title = 'Salvo!';
            text = funcionarioData.nome + ' salvo com sucesso!';
            this.sweetAlert.mostrarConfirmacao(title, text, 'success').then((result) => {
              this.router.navigate(['/funcionario/listar']);
            });
          },
          (error: any) => {
            title = 'Error!';
            text = funcionarioData.nome + ' não foi salvo!';
            this.sweetAlert.mostrarConfirmacao(title, text, 'warning');
            console.error('Erro ao salvar o funcionario:', error);
          }
        );
      }
    } else {
      console.log("Formulário inválido");
    }
  }

}
