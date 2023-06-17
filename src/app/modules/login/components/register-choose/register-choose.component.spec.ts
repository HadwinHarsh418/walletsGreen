import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterChooseComponent } from './register-choose.component';

describe('RegisterChooseComponent', () => {
  let component: RegisterChooseComponent;
  let fixture: ComponentFixture<RegisterChooseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterChooseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterChooseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
