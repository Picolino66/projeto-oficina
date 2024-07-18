import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlterarCriarClienteComponent } from './alterar-criar-cliente.component';

describe('AlterarCriarClienteComponent', () => {
  let component: AlterarCriarClienteComponent;
  let fixture: ComponentFixture<AlterarCriarClienteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AlterarCriarClienteComponent]
    });
    fixture = TestBed.createComponent(AlterarCriarClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
