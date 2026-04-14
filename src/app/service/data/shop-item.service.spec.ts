import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

import { ShopItemService } from './shop-item.service';

describe('ShopItemService', () => {
  let service: ShopItemService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()]
    });
    service = TestBed.inject(ShopItemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
