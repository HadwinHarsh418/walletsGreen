import { TestBed, inject } from '@angular/core/testing';

import { StellarHistoryService } from './stellar-history.service';

describe('StellarHistoryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StellarHistoryService]
    });
  });

  it('should be created', inject([StellarHistoryService], (service: StellarHistoryService) => {
    expect(service).toBeTruthy();
  }));
});
