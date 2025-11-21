import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopItemMenuComponent } from './shop-item-menu.component';

describe('ShopItemMenuComponent', () => {
  let component: ShopItemMenuComponent;
  let fixture: ComponentFixture<ShopItemMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShopItemMenuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShopItemMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
