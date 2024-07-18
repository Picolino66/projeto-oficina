import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  usuario: string = "";
  senha: string = ""
  errorMessage: string = '';

  constructor(
    private loginService: LoginService,
    private router: Router
  )
  {}
  async logar() {
    localStorage.clear();
    this.errorMessage = ''; // Limpa a mensagem de erro antes de tentar o login
    this.loginService.login(this.usuario, this.senha).subscribe(
      (res) => {
        this.router.navigate(['/dashboard']);
      },
      (error) => {
        if (error.status === 404 || error.status === 401) {
          this.errorMessage = 'Usuário ou senha errados';
        } else {
          this.errorMessage = 'Erro ao tentar fazer login';
        }
      }
    );
  }
}
