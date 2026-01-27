import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyAddressComponent } from './modify-address.component';

describe('ModifyAddressComponent', () => {
  let component: ModifyAddressComponent;
  let fixture: ComponentFixture<ModifyAddressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModifyAddressComponent]
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
