import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';

import { UserShopComponent } from './user-shop.component';

describe('UserShopComponent', () => {
  let component: UserShopComponent;
  let fixture: ComponentFixture<UserShopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserShopComponent],
      providers: [provideHttpClient(), provideHttpClientTesting(), provideRouter([])]
    })
      .compileComponents();

    fixture = TestBed.createComponent(UserShopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
