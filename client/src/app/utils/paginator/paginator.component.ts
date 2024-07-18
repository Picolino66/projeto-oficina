import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css']
})
export class PaginatorComponent {
  @Input() currentPage: number = 1;
  @Input() totalPages: number = 0;
  @Output() pageChanged = new EventEmitter<number>();

  changePage(page: number) {
    if (page < 1 || page > this.totalPages) return;
    this.pageChanged.emit(page);
  }
}
