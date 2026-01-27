import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateShopdListingComponent } from './create-shopd-listing.component';

describe('CreateShopdListingComponent', () => {
  let component: CreateShopdListingComponent;
  let fixture: ComponentFixture<CreateShopdListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateShopdListingComponent]
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
