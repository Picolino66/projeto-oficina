import { Component, OnInit } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FuncionarioService } from './services/funcionario.service';
import { LoginService } from './services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  dark: boolean = true;
  private routeSub: Subscription | undefined;
  title = 'client-oficina-josue-1.0';
  adm = false;
  constructor(
    private router: Router,
    private funcionario: FuncionarioService,
    private login: LoginService
  ) { }

  ngOnInit(): void {
    this.admin();
    this.routeSub = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const pagina = this.router.url.slice(1).replace(/\//g, '->');
        if(pagina.includes("dashboard")){
          this.title = "Painel";
        }else if(pagina.includes("cliente")){
          this.title = "Cliente";
        }else if(pagina.includes("funcionario")){
          this.title = "Funcionário";
        }else if(pagina.includes("veiculo")){
          this.title = "Veículo";
        }else if(pagina.includes("servico")){
          this.title = "Serviço";
        }else if(pagina.includes("orcamento")){
          this.title = "Orçamento";
        }else if(pagina.includes("relatorio")){
          const funcionarioId = this.extractFuncionarioIdFromUrl();
          this.funcionario.getFuncionarioById(funcionarioId).subscribe(funcionario => {
            this.title = `Relatório - ${funcionario.nome}`;
          });
        }
      }
    });
    document.body.classList.toggle('dark');
    initFlowbite();
  }

  private extractFuncionarioIdFromUrl(): string {
    // Implemente a lógica para extrair o ID do funcionário da URL aqui
    // Exemplo: Supondo que a URL seja /relatorio/20a2dd9c-9227-4484-8f40-223c687d8bbd
    // Você pode extrair o ID da seguinte maneira:
    const urlParts = this.router.url.split('/');
    const funcionarioId = urlParts[urlParts.length - 1];
    return funcionarioId;
  }

  ngOnDestroy() {
    this.routeSub?.unsubscribe(); // Limpar a inscrição para evitar vazamentos de memória
  }

  toggleTheme() {
    document.body.classList.toggle('dark');
    this.dark = !this.dark;
  }

  cadastro(){
    this.router.navigate(["/cadastro"]);
  }

  sair(){
    this.login.logout();
    localStorage.clear();
    this.router.navigate(["/"]);
  }

  admin(){
    this.login.authStatus$.subscribe(status => {
      this.adm = status;
    });
  }
}
