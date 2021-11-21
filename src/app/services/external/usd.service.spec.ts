import { TestBed, inject } from '@angular/core/testing';

import { UsdService } from './usd.service';

describe('UsdService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UsdService]
    });
  });

  it('should be created', inject([UsdService], (service: UsdService) => {
    expect(service).toBeTruthy();
  }));
});
