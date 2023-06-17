import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayrixPaymentComponent } from './payrix-payment.component';

describe('PayrixPaymentComponent', () => {
  let component: PayrixPaymentComponent;
  let fixture: ComponentFixture<PayrixPaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayrixPaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayrixPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
