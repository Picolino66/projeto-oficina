import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownRudComponent } from './dropdown-rud.component';

describe('DropdownRudComponent', () => {
  let component: DropdownRudComponent;
  let fixture: ComponentFixture<DropdownRudComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DropdownRudComponent]
    });
    fixture = TestBed.createComponent(DropdownRudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
