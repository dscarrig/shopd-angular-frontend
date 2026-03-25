import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyShopListingComponent } from './modify-shop-listing.component';

describe('ModifyShopListingComponent', () => {
  let component: ModifyShopListingComponent;
  let fixture: ComponentFixture<ModifyShopListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModifyShopListingComponent]
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
