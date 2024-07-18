import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-auto-complete-selector',
  templateUrl: './auto-complete-selector.component.html',
  styleUrls: ['./auto-complete-selector.component.css']
})
export class AutoCompleteSelectorComponent {
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() itensFiltrados: any[] = [];
  @Output() buscaTermo = new EventEmitter<string>();
  @Output() itemSelecionado = new EventEmitter<any>();
  @Input() valorSelecionado: string = '';

  termoBusca: string = ''; // Adicionando a propriedade termoBusca
  selecionou: boolean = false;

  ngOnInit(){
    this.termoBusca = this.valorSelecionado;
  }
  buscar(termo: string) {
    this.buscaTermo.emit(termo);
  }

  selecionarItem(item: any) {
    this.itemSelecionado.emit(item);
    this.termoBusca = item.nome;
    this.selecionou = true;
  }
}
