import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';

import { VerifyAddressComponent } from './verify-address.component';

describe('VerifyAddressComponent', () => {
  let component: VerifyAddressComponent;
  let fixture: ComponentFixture<VerifyAddressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerifyAddressComponent],
      providers: [provideHttpClient(), provideHttpClientTesting(), provideRouter([])]
    })
      .compileComponents();

    fixture = TestBed.createComponent(VerifyAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
