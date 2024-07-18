import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlterarCriarOrcamentoComponent } from './alterar-criar-orcamento.component';

describe('AlterarCriarOrcamentoComponent', () => {
  let component: AlterarCriarOrcamentoComponent;
  let fixture: ComponentFixture<AlterarCriarOrcamentoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AlterarCriarOrcamentoComponent]
    });
    fixture = TestBed.createComponent(AlterarCriarOrcamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
