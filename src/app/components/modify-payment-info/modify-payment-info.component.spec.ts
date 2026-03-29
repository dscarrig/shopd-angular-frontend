import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyPaymentInfoComponent } from './modify-payment-info.component';

describe('ModifyPaymentInfoComponent', () => {
  let component: ModifyPaymentInfoComponent;
  let fixture: ComponentFixture<ModifyPaymentInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModifyPaymentInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifyPaymentInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
