import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlterarCriarFuncionarioComponent } from './alterar-criar-funcionario.component';

describe('AlterarCriarFuncionarioComponent', () => {
  let component: AlterarCriarFuncionarioComponent;
  let fixture: ComponentFixture<AlterarCriarFuncionarioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AlterarCriarFuncionarioComponent]
    });
    fixture = TestBed.createComponent(AlterarCriarFuncionarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
