import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule, registerLocaleData  } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';

import { AppComponent } from './app.component';
import { ListarClientesComponent } from './components/clientes/listar-clientes/listar-clientes.component';
import { DropdownRudComponent } from './utils/dropdown-rud/dropdown-rud.component';
import { AlterarCriarClienteComponent } from './components/clientes/alterar-criar-cliente/alterar-criar-cliente.component';
import { AlterarCriarFuncionarioComponent } from './components/funcionarios/alterar-criar-funcionario/alterar-criar-funcionario.component';
import { ListarFuncionariosComponent } from './components/funcionarios/listar-funcionarios/listar-funcionarios.component';
import { AlterarCriarVeiculoComponent } from './components/veiculo/alterar-criar-veiculo/alterar-criar-veiculo.component';
import { ListarVeiculosComponent } from './components/veiculo/listar-veiculos/listar-veiculos.component';
import { AlterarCriarOrcamentoComponent } from './components/orcamento/alterar-criar-orcamento/alterar-criar-orcamento.component';
import { ListarOrcamentosComponent } from './components/orcamento/listar-orcamentos/listar-orcamentos.component';
import { PaginatorComponent } from './utils/paginator/paginator.component';
import { AutoCompleteSelectorComponent } from './utils/auto-complete-selector/auto-complete-selector.component';
import { InputSearchComponent } from './utils/input-search/input-search.component';
import { AlterarCriarServicoComponent } from './components/servicos/alterar-criar-servico/alterar-criar-servico.component';
import { ListarServicosComponent } from './components/servicos/listar-servicos/listar-servicos.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { CadastroComponent } from './components/cadastro/cadastro.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptor/auth.interceptor';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { PhoneMaskDirective } from './directives/phone-mask.directive';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import localePt from '@angular/common/locales/pt';

registerLocaleData(localePt, 'pt-BR');
@NgModule({
  declarations: [
    AppComponent,
    ListarClientesComponent,
    DropdownRudComponent,
    AlterarCriarClienteComponent,
    AlterarCriarFuncionarioComponent,
    ListarFuncionariosComponent,
    AlterarCriarVeiculoComponent,
    ListarVeiculosComponent,
    AlterarCriarOrcamentoComponent,
    ListarOrcamentosComponent,
    PaginatorComponent,
    AutoCompleteSelectorComponent,
    InputSearchComponent,
    AlterarCriarServicoComponent,
    ListarServicosComponent,
    DashboardComponent,
    LoginComponent,
    CadastroComponent,
    PhoneMaskDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxMaskDirective,
    NgxMaskPipe,
    PdfViewerModule,
    CKEditorModule,
    CommonModule
  ],
  exports:[
    PhoneMaskDirective
  ],
  providers: [
    provideNgxMask(),
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
