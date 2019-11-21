import { TestBed } from '@angular/core/testing';

import { ComplainsService } from './complains.service';

describe('ComplainsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ComplainsService = TestBed.get(ComplainsService);
    expect(service).toBeTruthy();
  });
});
