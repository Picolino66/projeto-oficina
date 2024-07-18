import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlterarCriarVeiculoComponent } from './alterar-criar-veiculo.component';

describe('AlterarCriarVeiculoComponent', () => {
  let component: AlterarCriarVeiculoComponent;
  let fixture: ComponentFixture<AlterarCriarVeiculoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AlterarCriarVeiculoComponent]
    });
    fixture = TestBed.createComponent(AlterarCriarVeiculoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
