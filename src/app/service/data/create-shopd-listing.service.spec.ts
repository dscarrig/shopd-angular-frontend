import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

import { CreateShopdListingService } from './create-shopd-listing.service';

describe('CreateShopdListingService', () => {
  let service: CreateShopdListingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()]
    });
    service = TestBed.inject(CreateShopdListingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
