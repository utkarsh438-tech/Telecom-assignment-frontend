import { TestBed } from '@angular/core/testing';

import { ShelfPositionService } from './shelf-position.service';

describe('ShelfPositionService', () => {
  let service: ShelfPositionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShelfPositionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
