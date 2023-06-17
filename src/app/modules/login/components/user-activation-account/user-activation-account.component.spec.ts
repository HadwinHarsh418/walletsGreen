import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserActivationAccountComponent } from './user-activation-account.component';

describe('UserActivationAccountComponent', () => {
  let component: UserActivationAccountComponent;
  let fixture: ComponentFixture<UserActivationAccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserActivationAccountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserActivationAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
