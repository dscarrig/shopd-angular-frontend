import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';

import { UserListingsComponent } from './user-listings.component';

describe('UserListingsComponent', () => {
  let component: UserListingsComponent;
  let fixture: ComponentFixture<UserListingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserListingsComponent],
      providers: [provideHttpClient(), provideHttpClientTesting(), provideRouter([])]
    })
      .compileComponents();

    fixture = TestBed.createComponent(UserListingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
