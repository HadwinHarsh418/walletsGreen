import { TestBed } from '@angular/core/testing';

import { PayrixService } from './payrix.service';

describe('PayrixService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PayrixService = TestBed.get(PayrixService);
    expect(service).toBeTruthy();
  });
});
