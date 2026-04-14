import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';

import { ModifyShopListingComponent } from './modify-shop-listing.component';

describe('ModifyShopListingComponent', () => {
  let component: ModifyShopListingComponent;
  let fixture: ComponentFixture<ModifyShopListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModifyShopListingComponent],
      providers: [provideHttpClient(), provideHttpClientTesting(), provideRouter([])]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ModifyShopListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
