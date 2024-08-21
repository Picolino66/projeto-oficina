# Diretivas no Angular 16

**Diretivas** no Angular são instruções que você coloca em seus templates para manipular elementos do DOM, seja para alterar o layout, aplicar classes, ou reagir a eventos.

## Tipos de Diretivas

Angular 16 oferece três tipos principais de diretivas:

### 1. Diretivas Atributivas

As diretivas atributivas alteram a aparência ou comportamento de um elemento existente no DOM, adicionando, removendo ou modificando seus atributos.

Exemplos:
- `[ngClass]`: Aplica ou remove classes CSS dinamicamente.
- `[ngStyle]`: Aplica estilos inline com base em uma expressão.

Exemplo de uso:

```html
<div [ngClass]="{'classe-ativa': isAtivo}">Texto</div>
```

### 2. Diretivas Estruturais
As diretivas estruturais alteram a estrutura do DOM, adicionando ou removendo elementos. São precedidas por um asterisco (*).

Exemplos:

- **`ngIf`**: Condicionalmente adiciona ou remove um elemento do DOM.
- **`ngFor`**: Itera sobre uma coleção, criando um elemento para cada item.
- **`ngSwitch`**: Renderiza um de vários elementos possíveis com base em uma expressão.

Exemplo de uso:
```html
<div *ngIf="isVisivel">Este texto é visível</div>
<ul>
  <li *ngFor="let item of itens">{{ item }}</li>
</ul>
```

### 3. Diretivas Personalizadas
Você pode criar suas próprias diretivas para encapsular lógica de manipulação do DOM que seja reutilizável em sua aplicação.

Exemplo básico de uma diretiva personalizada que altera a cor do texto:

```bash
import { Directive, ElementRef, Renderer2, HostListener } from '@angular/core';

@Directive({
  selector: '[appAlteraCor]'
})
export class AlteraCorDirective {
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('mouseenter') onMouseEnter() {
    this.renderer.setStyle(this.el.nativeElement, 'color', 'blue');
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.renderer.setStyle(this.el.nativeElement, 'color', 'black');
  }
}
```

No template, a diretiva pode ser usada como um atributo:
```html
<p appAlteraCor>Passe o mouse sobre este texto para mudar sua cor.</p>
```

Diretivas são fundamentais para a criação de interfaces dinâmicas e reutilizáveis no Angular, e permitem uma grande flexibilidade na manipulação do DOM de forma declarativa.