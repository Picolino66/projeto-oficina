# Componentes no Angular 16

Os componentes são os blocos de construção fundamentais de uma aplicação Angular. Cada componente é uma combinação de:

- **Classe**: Implementa a lógica do componente.
- **Template**: Define a estrutura HTML que o componente renderiza.
- **Styles**: Aplica o CSS específico ao componente.
- **Metadados**: Através do decorador `@Component`, que vincula a classe ao seu template e estilo.

## Criando um Componente

Para criar um novo componente, você pode usar o Angular CLI:

```bash
ng generate component nome-do-componente
```

Isso cria os seguintes arquivos:

- **`nome-do-componente.component.ts`**: Contém a classe do componente.
- **`nome-do-componente.component.html`**: Contém o template.
- **`nome-do-componente.component.css`**: Contém os estilos específicos.
- **`nome-do-componente.component.spec.ts`**: Contém os testes unitários para o componente.

## Decorador @Component
O decorador @Component é utilizado para definir os metadados do componente. Exemplo:

```bash
import { Component } from '@angular/core';

@Component({
  selector: 'app-nome-do-componente',
  templateUrl: './nome-do-componente.component.html',
  styleUrls: ['./nome-do-componente.component.css']
})
export class NomeDoComponenteComponent {
  titulo = 'Meu Componente Angular';
}
```

## Ciclo de Vida dos Componentes
Angular oferece uma série de hooks de ciclo de vida que permitem executar código em momentos específicos da vida de um componente:

- **`ngOnInit()`**: Chamado uma vez após a inicialização do componente.
- **`ngOnChanges()`**: Chamado quando uma propriedade de entrada (input) é alterada.
- **`ngOnDestroy()`**: Chamado antes do componente ser destruído, útil para limpar recursos.

Esses hooks ajudam a gerenciar como e quando a lógica do componente deve ser executada.

## Comunicação entre Componentes
Componentes podem se comunicar de várias maneiras:

- **Input/Output**: Utilizado para passar dados de um componente pai para um filho (@Input) ou emitir eventos do filho para o pai (@Output).
- **Serviços Compartilhados**: Utilizando injeção de dependência para compartilhar um serviço entre componentes, permitindo a troca de informações sem necessidade de relacionamentos diretos.

Angular 16 mantém o foco em uma arquitetura modular e escalável, onde componentes desempenham um papel central na criação de interfaces de usuário dinâmicas e reativas.