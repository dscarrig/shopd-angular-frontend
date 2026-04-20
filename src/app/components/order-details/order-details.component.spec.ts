import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { of, throwError } from 'rxjs';

import { OrderDetailsComponent } from './order-details.component';
import { OrderService } from 'src/app/service/data/order.service';
import { Order } from 'src/app/app.classes';

describe('OrderDetailsComponent', () => {
  let component: OrderDetailsComponent;
  let fixture: ComponentFixture<OrderDetailsComponent>;
  let mockOrderService: jasmine.SpyObj<OrderService>;

  const mockOrder: Order = new Order('order-1', 'user-1', [], 99.99, 'PENDING', '2026-01-01');

  beforeEach(async () => {
    // 1. Create spy with the method names you'll use
    mockOrderService = jasmine.createSpyObj('OrderService', ['getOrder']);

    // 2. Set default return values on the spies
    mockOrderService.getOrder.and.returnValue(of(mockOrder));

    await TestBed.configureTestingModule({
      imports: [OrderDetailsComponent],
      providers: [
        provideRouter([]),
        // 3. Override the real service with your spy
        { provide: OrderService, useValue: mockOrderService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(OrderDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();  // triggers ngOnInit
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getOrder on init and set order', () => {
    expect(mockOrderService.getOrder).toHaveBeenCalled();
    expect(component.order).toEqual(mockOrder);
  });

  //it('should handle getOrder error gracefully', () => {
  //  // Override the spy for a specific test
  //  mockOrderService.getOrder.and.returnValue(throwError(() => new Error('404')));
  //  spyOn(console, 'error');
  //
  //  component.ngOnInit();
  //
  //  expect(console.error).toHaveBeenCalled();
  //  expect(component.order).toBeNull();
  //});
});