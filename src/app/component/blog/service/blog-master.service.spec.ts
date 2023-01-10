import { TestBed } from '@angular/core/testing';

import { BlogMasterService } from './blog-master.service';

describe('BlogMasterService', () => {
  let service: BlogMasterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BlogMasterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
