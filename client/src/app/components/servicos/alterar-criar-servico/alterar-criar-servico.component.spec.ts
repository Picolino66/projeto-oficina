import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlterarCriarServicoComponent } from './alterar-criar-servico.component';

describe('AlterarCriarServicoComponent', () => {
  let component: AlterarCriarServicoComponent;
  let fixture: ComponentFixture<AlterarCriarServicoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AlterarCriarServicoComponent]
    });
    fixture = TestBed.createComponent(AlterarCriarServicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
