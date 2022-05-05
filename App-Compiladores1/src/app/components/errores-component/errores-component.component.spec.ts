import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErroresComponentComponent } from './errores-component.component';

describe('ErroresComponentComponent', () => {
  let component: ErroresComponentComponent;
  let fixture: ComponentFixture<ErroresComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ErroresComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ErroresComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
