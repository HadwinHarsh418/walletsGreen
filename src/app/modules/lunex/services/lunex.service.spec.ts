import { TestBed } from '@angular/core/testing';

import { LunexService } from './lunex.service';

describe('LunexService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LunexService = TestBed.get(LunexService);
    expect(service).toBeTruthy();
  });
});
