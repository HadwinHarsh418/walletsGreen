import { TestBed } from '@angular/core/testing';

import { MerchantDetailService } from './merchant-detail.service';

describe('MerchantDetailService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MerchantDetailService = TestBed.get(MerchantDetailService);
    expect(service).toBeTruthy();
  });
});
