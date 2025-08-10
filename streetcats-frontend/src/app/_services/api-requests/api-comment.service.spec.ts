import { TestBed } from '@angular/core/testing';

import { ApiCommentService } from './api-comment.service';

describe('ApiCommentService', () => {
  let service: ApiCommentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiCommentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
