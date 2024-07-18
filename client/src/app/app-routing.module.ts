import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AlterarCriarClienteComponent } from './components/clientes/alterar-criar-cliente/alterar-criar-cliente.component';
import { ListarClientesComponent } from './components/clientes/listar-clientes/listar-clientes.component';
import { AlterarCriarFuncionarioComponent } from './components/funcionarios/alterar-criar-funcionario/alterar-criar-funcionario.component';
import { ListarFuncionariosComponent } from './components/funcionarios/listar-funcionarios/listar-funcionarios.component';
import { AlterarCriarVeiculoComponent } from './components/veiculo/alterar-criar-veiculo/alterar-criar-veiculo.component';
import { ListarVeiculosComponent } from './components/veiculo/listar-veiculos/listar-veiculos.component';
import { AlterarCriarOrcamentoComponent } from './components/orcamento/alterar-criar-orcamento/alterar-criar-orcamento.component';
import { ListarOrcamentosComponent } from './components/orcamento/listar-orcamentos/listar-orcamentos.component';
import { AlterarCriarServicoComponent } from './components/servicos/alterar-criar-servico/alterar-criar-servico.component';
import { ListarServicosComponent } from './components/servicos/listar-servicos/listar-servicos.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { CadastroComponent } from './components/cadastro/cadastro.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'cadastro',
    component: CadastroComponent,
  },
  //CLIENTE
  {
    path: 'cliente/criar',
    component: AlterarCriarClienteComponent,
  },
  {
    path: 'cliente/alterar',
    component: AlterarCriarClienteComponent,
  },
  {
    path: 'cliente/listar',
    component: ListarClientesComponent,
  },
  //FUNCIONARIO
  {
    path: 'funcionario/criar',
    component: AlterarCriarFuncionarioComponent,
  },
  {
    path: 'funcionario/alterar',
    component: AlterarCriarFuncionarioComponent,
  },
  {
    path: 'funcionario/listar',
    component: ListarFuncionariosComponent,
  },
  //VEICULO
  {
    path: 'veiculo/alterar',
    component: AlterarCriarVeiculoComponent,
  },
  {
    path: 'veiculo/criar',
    component: AlterarCriarVeiculoComponent,
  },
  {
    path: 'veiculo/listar',
    component: ListarVeiculosComponent,
  },
  {
      path: 'veiculo/listar/:id',
      component: ListarVeiculosComponent
  },
  //ORCAMENTO
  {
    path: 'orcamento/alterar',
    component: AlterarCriarOrcamentoComponent,
  },
  {
    path: 'orcamento/criar',
    component: AlterarCriarOrcamentoComponent,
  },
  {
    path: 'orcamento/listar',
    component: ListarOrcamentosComponent,
  },
  //ORCAMENTO
  {
    path: 'servico/alterar',
    component: AlterarCriarServicoComponent,
  },
  {
    path: 'servico/criar',
    component: AlterarCriarServicoComponent,
  },
  {
    path: 'servico/listar',
    component: ListarServicosComponent,
  },
  {
      path: 'servico/listar/:id',
      component: ListarServicosComponent
  },
  {
      path: 'servico/listar/cliente/:clienteId',
      component: ListarServicosComponent
  },
  //Relatorio
  {
    path: 'relatorio/:funcionarioId',
    component: ListarServicosComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
