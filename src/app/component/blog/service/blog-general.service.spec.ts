import { TestBed } from '@angular/core/testing';

import { BlogGeneralService } from './blog-general.service';

describe('BlogGeneralService', () => {
  let service: BlogGeneralService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BlogGeneralService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
