import { TestBed } from '@angular/core/testing';

import { HandsetService } from './handset.service';

describe('HandsetService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HandsetService = TestBed.get(HandsetService);
    expect(service).toBeTruthy();
  });
});
