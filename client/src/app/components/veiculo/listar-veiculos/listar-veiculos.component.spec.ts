import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarVeiculosComponent } from './listar-veiculos.component';

describe('ListarVeiculosComponent', () => {
  let component: ListarVeiculosComponent;
  let fixture: ComponentFixture<ListarVeiculosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListarVeiculosComponent]
    });
    fixture = TestBed.createComponent(ListarVeiculosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
