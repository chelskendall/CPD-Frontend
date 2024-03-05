import { TestBed } from '@angular/core/testing';

import { CpdService } from './cpd.service';

describe('CpdService', () => {
  let service: CpdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CpdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
