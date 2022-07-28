import { TestBed } from '@angular/core/testing';

import { DestiantionService } from './destiantion.service';

describe('DestiantionService', () => {
  let service: DestiantionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DestiantionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
