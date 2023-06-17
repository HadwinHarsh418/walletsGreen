import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayrixPaymentNewComponent } from './payrix-payment.component';

describe('PayrixPaymentNewComponent', () => {
  let component: PayrixPaymentNewComponent;
  let fixture: ComponentFixture<PayrixPaymentNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayrixPaymentNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayrixPaymentNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
