import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/interfaces/usuario';
import { LoginService } from 'src/app/services/login.service';
import { SweetAlertService } from 'src/app/services/sweet-alert.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent {
  usuarioForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router,
    private sweetAlert: SweetAlertService
  ){}

  ngOnInit() {
    this.usuarioForm = this.fb.group({
      id: [''],
      name: ['', Validators.required],
      password: ['', Validators.required],
      username: ['', Validators.required],
      nivel: ['']
    });
  }

  cadastro(){
    const usuarioData: Usuario = this.usuarioForm.value;
    let title;
    let text;
    this.loginService.cadastro(usuarioData).subscribe(
      (response: any) => {
        title = 'Salvo!';
        text = usuarioData.name + ' salvo com sucesso!';
        this.sweetAlert.mostrarConfirmacao(title, text, 'success').then((result) => {
          this.router.navigate(['/dashboard']);
        });
      },
      (error: any) => {
        title = 'Error!';
        text = usuarioData.name + ' não foi salvo!';
        this.sweetAlert.mostrarConfirmacao(title, error.error.error, 'warning');
      }
    );
  }
}
