import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrcamentoService } from '../../../services/orcamento.service';
import { Orcamento } from '../../../interfaces/orcamento.interface';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { SweetAlertService } from 'src/app/services/sweet-alert.service';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-alterar-criar-orcamento',
  templateUrl: './alterar-criar-orcamento.component.html',
  styleUrls: ['./alterar-criar-orcamento.component.css']
})
export class AlterarCriarOrcamentoComponent {
  orcamentoForm!: FormGroup;
  Editor = ClassicEditor;

  constructor(
    private fb: FormBuilder,
    private orcamentoService: OrcamentoService,
    private router: Router,
    private dataService: DataService,
    private sweetAlert: SweetAlertService
  ) { }

  ngOnInit() {
    this.orcamentoForm = this.fb.group({
      id: [''],
      descricao: ['', Validators.required],
      cliente: ['', Validators.required]
    });

    this.dataService.getData<[Orcamento, string]>().subscribe(orcamento => {
      if (orcamento && orcamento[1].includes("orcamento")) {
        this.orcamentoForm.patchValue(orcamento[0]);
      }
    });
  }

  onSubmit() {
    if (this.orcamentoForm.valid) {
      const orcamentoData: Orcamento = this.orcamentoForm.value;
      let title = '';
      let text = '';
      if(orcamentoData.id && orcamentoData.id.length > 0){
        title = 'Tem certeza que deseja alterar o orçammento';
        this.sweetAlert.mostrarAlerta(title, text, 'warning').then((result) => {
          if (result.isConfirmed) {
            this.orcamentoService.updateOrcamentoById(orcamentoData).subscribe(
              (response: any) => {
                title = 'Alterado!';
                text = 'Orçamento alterado com sucesso!';
                this.sweetAlert.mostrarConfirmacao(title, text, 'success').then((result) => {
                  this.router.navigate(['/orcamento/listar']);
                });
              },
              (error: any) => {
                title = 'Error!';
                text = 'Orçamento não foi alterado!';
                this.sweetAlert.mostrarConfirmacao(title, text, 'warning');
                console.error('Erro ao alterar orçamento:', error);
              }
            );
          }
        });
      }else{
        this.orcamentoService.createOrcamento(orcamentoData).subscribe(
          (response: any) => {
            title = 'Salvo!';
            text = 'Orçamento salvo com sucesso!';
            this.sweetAlert.mostrarConfirmacao(title, text, 'success').then((result) => {
              this.router.navigate(['/orcamento/listar']);
            });
          },
          (error: any) => {
            title = 'Error!';
            text = 'Orçamento não foi salvo!';
            this.sweetAlert.mostrarConfirmacao(title, text, 'warning');
            console.error('Erro ao salvar o orcamento:', error);
          }
        );
      }
    } else {
      console.log("Formulário inválido");
    }
  }
}
