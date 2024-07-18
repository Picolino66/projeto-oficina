import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-input-search',
  templateUrl: './input-search.component.html',
  styleUrls: ['./input-search.component.css']
})
export class InputSearchComponent {
  searchValue: string = '';

  @Output() searchChange = new EventEmitter<string>();

  onSearchChange(): void {
    this.searchChange.emit(this.searchValue);
  }

  limpar(){
    this.searchValue = '';
    this.searchChange.emit('resetar');
  }

}
