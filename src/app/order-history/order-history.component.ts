import { Component, OnInit, Input, inject } from '@angular/core';
import { OrderService, Order } from '../service/app/order.service';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent implements OnInit {
  @Input() username?: string;
  orders: Order[] = [];
  isLoading = false;
  errorMessage = '';
  
  private orderService = inject(OrderService);

  ngOnInit(): void {
    // Initialize order history for the given username
    if (this.username) {
      this.loadOrderHistory();
    }
    else {
      this.errorMessage = 'No username provided to load order history.';
    }
  }

  private loadOrderHistory(): void {
    if (!this.username) {
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    
    this.orderService.getUserOrders(this.username).subscribe({
      next: (orders) => {
        this.orders = orders;
        this.isLoading = false;
        console.log(`Loaded ${orders.length} orders for ${this.username}`);
      },
      error: (error) => {
        console.error('Error loading order history:', error);
        this.errorMessage = 'Failed to load order history. Please try again later.';
        this.isLoading = false;
      }
    });
  }

  hasOrders(): boolean {
    return this.orders && this.orders.length > 0;
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  }

}
