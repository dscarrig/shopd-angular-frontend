import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';

import { OrderHistoryComponent } from './order-history.component';
import { OrderService } from 'src/app/service/data/order.service';

describe('OrderHistoryComponent', () => {
  let component: OrderHistoryComponent;
  let fixture: ComponentFixture<OrderHistoryComponent>;
  let mockOrderService: jasmine.SpyObj<OrderService>;

  beforeEach(async () => {
    // 1. Create spy with the method names you'll use
    mockOrderService = jasmine.createSpyObj('OrderService', ['getOrders']);

    // 2. Set default return values on the spies
    //mockOrderService.getOrders.and.returnValue(of([]));

    await TestBed.configureTestingModule({
      imports: [OrderHistoryComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([]),
        { provide: OrderService, useValue: mockOrderService }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(OrderHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('has orders returns true when there are orders', () => {
    component.orders = [
      {
        orderId: '1',
        userId: '',
        items: [],
        totalAmount: 0,
        status: '',
        createdAt: ''
      }
    ];
    expect(component.hasOrders()).toBeTrue();
  });
});
