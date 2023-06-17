import { TestBed, inject } from '@angular/core/testing';

import { SendPaymentService } from './send-payment.service';

describe('SendPaymentService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SendPaymentService]
    });
  });

  it('should be created', inject([SendPaymentService], (service: SendPaymentService) => {
    expect(service).toBeTruthy();
  }));
});
