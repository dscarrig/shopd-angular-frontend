import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';

import { CreateShopdListingComponent } from './create-shopd-listing.component';

describe('CreateShopdListingComponent', () => {
  let component: CreateShopdListingComponent;
  let fixture: ComponentFixture<CreateShopdListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateShopdListingComponent],
      providers: [provideHttpClient(), provideHttpClientTesting(), provideRouter([])]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CreateShopdListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
