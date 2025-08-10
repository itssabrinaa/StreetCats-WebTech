import { TestBed } from '@angular/core/testing';

import { ApiCatService } from './api-cat.service';

describe('ApiCatService', () => {
  let service: ApiCatService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiCatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
