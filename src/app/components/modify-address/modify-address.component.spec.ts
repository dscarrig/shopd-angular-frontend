import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';

import { ModifyAddressComponent } from './modify-address.component';

describe('ModifyAddressComponent', () => {
  let component: ModifyAddressComponent;
  let fixture: ComponentFixture<ModifyAddressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModifyAddressComponent],
      providers: [provideHttpClient(), provideHttpClientTesting(), provideRouter([])]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ModifyAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
