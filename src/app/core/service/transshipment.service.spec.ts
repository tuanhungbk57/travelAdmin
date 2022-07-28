import { TestBed } from '@angular/core/testing';

import { TransshipmentService } from './transshipment.service';

describe('TransshipmentService', () => {
  let service: TransshipmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransshipmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
