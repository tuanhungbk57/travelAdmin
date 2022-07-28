import { TestBed } from '@angular/core/testing';

import { DestiantionMasterService } from './destiantion-master.service';

describe('DestiantionMasterService', () => {
  let service: DestiantionMasterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DestiantionMasterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
