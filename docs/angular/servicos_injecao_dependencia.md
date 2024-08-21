# Serviços e Injeção de Dependência no Angular 16

No Angular 16, **serviços** são usados para encapsular lógica de negócios ou acesso a dados que pode ser compartilhada entre diferentes componentes. Eles são geralmente classes que realizam tarefas específicas e são injetados nos componentes ou outros serviços através do mecanismo de **Injeção de Dependência** (DI) do Angular.

## Criando um Serviço

Você pode criar um serviço utilizando o Angular CLI:

```bash
ng generate service nome-do-servico
```

```bash
Isso criará uma classe de serviço com um arquivo .ts como este:

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NomeDoServico {
  constructor() { }

  getDados() {
    // Lógica para obter dados
  }
}
```

- O decorador **`@Injectable`** indica que essa classe pode ter dependências injetadas.
- providedIn: **`root`** faz com que o serviço seja registrado na raiz do aplicativo, tornando-o disponível em toda a aplicação sem a necessidade de importá-lo em módulos individuais.

## Injeção de Dependência
A Injeção de Dependência (DI) é um padrão de design que permite que objetos recebam suas dependências de uma fonte externa, em vez de criarem-nas internamente. No Angular, o DI é utilizado para injetar serviços em componentes, outros serviços ou até mesmo diretivas.

## Exemplo de Injeção de Dependência
Aqui está como você pode injetar um serviço em um componente:

```bash
import { Component, OnInit } from '@angular/core';
import { NomeDoServico } from './nome-do-servico.service';

@Component({
  selector: 'app-meu-componente',
  templateUrl: './meu-componente.component.html',
  styleUrls: ['./meu-componente.component.css']
})
export class MeuComponenteComponent implements OnInit {

  dados: any;

  constructor(private servico: NomeDoServico) { }

  ngOnInit(): void {
    this.dados = this.servico.getDados();
  }
}
```

- **`private servico: NomeDoServico`**: Aqui, o serviço é injetado através do construtor do componente.
- **`ngOnInit()`**: O serviço é utilizado para obter dados quando o componente é inicializado.

## Escopos de Serviços
Os serviços podem ter diferentes escopos:

- **`Singleton`**: Um único objeto de serviço é criado e compartilhado por toda a aplicação (quando providedIn: 'root' é usado).
- **`Módulo`**: O serviço é escopado ao módulo em que é declarado, o que significa que diferentes instâncias podem existir se o módulo for carregado várias vezes.
- **`Componente`**: O serviço é escopado ao componente específico e seus filhos (menos comum, mas possível).

## Injeção Hierárquica
O Angular 16 utiliza uma injeção de dependência hierárquica, o que significa que o escopo dos serviços pode ser controlado com base na hierarquia dos componentes e módulos. Isso permite grande flexibilidade no design da aplicação, especialmente em aplicativos grandes e complexos.

Os serviços e o sistema de injeção de dependência são parte essencial do Angular, permitindo a criação de aplicações modulares, escaláveis e fáceis de manter.