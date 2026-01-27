import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopdListingFormComponent } from './shopd-listing-form.component';

describe('ShopdListingFormComponent', () => {
  let component: ShopdListingFormComponent;
  let fixture: ComponentFixture<ShopdListingFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShopdListingFormComponent]
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
