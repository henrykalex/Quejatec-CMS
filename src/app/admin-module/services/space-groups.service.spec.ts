import { TestBed } from '@angular/core/testing';

import { SpaceGroupsService } from './space-groups.service';

describe('SpaceGroupsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SpaceGroupsService = TestBed.get(SpaceGroupsService);
    expect(service).toBeTruthy();
  });
});
