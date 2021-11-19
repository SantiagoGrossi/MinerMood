import { TestBed, inject } from '@angular/core/testing';

import { EthermineService } from './ethermine.service';

describe('EthermineService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EthermineService]
    });
  });

  it('should be created', inject([EthermineService], (service: EthermineService) => {
    expect(service).toBeTruthy();
  }));
});
