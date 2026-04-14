import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';

import { ShopdListingFormComponent } from './shopd-listing-form.component';

describe('ShopdListingFormComponent', () => {
  let component: ShopdListingFormComponent;
  let fixture: ComponentFixture<ShopdListingFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShopdListingFormComponent],
      providers: [provideHttpClient(), provideHttpClientTesting(), provideRouter([])]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ShopdListingFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
