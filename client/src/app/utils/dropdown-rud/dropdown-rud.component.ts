import { Component, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { EstadoService } from 'src/app/services/estado.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-dropdown-rud',
  templateUrl: './dropdown-rud.component.html',
  styleUrls: ['./dropdown-rud.component.css']
})
export class DropdownRudComponent {

  @Input() rotaAlterar: string = '';
  @Input() objetoPai = {} as any;
  @Output() eventoFilho = new EventEmitter<{objeto: any; opcao: number}>();

  dropdownState: { [key: string]: boolean } = {};
  objetoIdLast: string = "";
  listenerAtivo: boolean = false;

  constructor(
    private router: Router,
    private estadoService: EstadoService,
    private dataService: DataService
  ) { }

  redirecionar(rota: string) {
    this.dataService.clearData();
    this.dataService.setData<any>([this.objetoPai, rota]);
    if (this.objetoPai.id) {
      this.router.navigate([rota]);
    }
  }

  modalOpcoes(objeto: any, opcoes: number) {
    this.eventoFilho.emit({"objeto": objeto, "opcao": opcoes});
  }

  onSelectChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const selectedOption = parseInt(selectElement.value);

    switch (selectedOption) {
      case 1:
        this.modalOpcoes(this.objetoPai, 1);
        break;
      case 2:
        this.redirecionar(this.rotaAlterar);
        break;
      case 3:
        this.modalOpcoes(this.objetoPai, 2);
        break;
      default:
        console.log("Nenhuma opção selecionada");
    }
    selectElement.value = "";
  }
}
