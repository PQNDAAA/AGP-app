import { TestBed } from '@angular/core/testing';

import { InternalControlsService } from './internal-controls-service';

describe('InternalControlsService', () => {
  let service: InternalControlsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InternalControlsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
