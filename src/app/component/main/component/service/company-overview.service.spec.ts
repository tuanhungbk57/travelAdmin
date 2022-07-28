import { TestBed } from '@angular/core/testing';

import { CompanyOverviewService } from './company-overview.service';

describe('CompanyOverviewService', () => {
  let service: CompanyOverviewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompanyOverviewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
