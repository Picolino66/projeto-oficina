import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EstadoService {
  private objetoIdLastSource = new BehaviorSubject<string | null>(null);
  private dropdownStateSource = new BehaviorSubject<{ [key: string]: boolean } | null>(null);

  constructor() { }

  //Estado do ultimo id Objeto para o dropdown
  setObjetoIdLast(id: string | null) {
    this.objetoIdLastSource.next(id);
  }
  getObjetoIdLastDirectly() {
    return this.objetoIdLastSource.getValue();
  }

  //Estado da última configuração do dropdown
  setDropdownState(id: { [key: string]: boolean } | null) {
    this.dropdownStateSource.next(id);
  }
  getDropdownState() {
    return this.dropdownStateSource.getValue();
  }
}

