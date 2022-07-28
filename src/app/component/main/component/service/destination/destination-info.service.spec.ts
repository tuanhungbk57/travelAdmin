import { TestBed } from '@angular/core/testing';

import { DestinationInfoService } from './destination-info.service';

describe('DestinationInfoService', () => {
  let service: DestinationInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DestinationInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
