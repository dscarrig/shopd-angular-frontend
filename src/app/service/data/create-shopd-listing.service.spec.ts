import { TestBed } from '@angular/core/testing';

import { CreateShopdListingService } from './create-shopd-listing.service';

describe('CreateShopdListingService', () => {
  let service: CreateShopdListingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateShopdListingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
