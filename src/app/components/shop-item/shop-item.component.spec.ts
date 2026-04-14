import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';

import { ShopItemComponent } from './shop-item.component';

describe('ShopItemComponent', () => {
  let component: ShopItemComponent;
  let fixture: ComponentFixture<ShopItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShopItemComponent],
      providers: [provideHttpClient(), provideHttpClientTesting(), provideRouter([])]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ShopItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
