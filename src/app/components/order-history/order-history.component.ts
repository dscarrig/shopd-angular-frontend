import { Component, OnInit, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Order } from '../../service/app/order.service';
import { PurchaseHistoryService } from 'src/app/service/data/purchase-history.service';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class OrderHistoryComponent implements OnInit {
  @Input() username?: string;
  @Input() userId?: string;
  orders: Order[] = [];
  isLoading: boolean = false;
  errorMessage: string = '';

  private purchaseHistoryService: PurchaseHistoryService = inject(PurchaseHistoryService);

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
    if (!this.username || !this.userId) {
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    this.purchaseHistoryService.getUserPurchaseHistory(this.userId).subscribe({
      next: (orders: Order[]) => {
        this.orders = orders;
        this.isLoading = false;
        console.log(`Loaded ${orders.length} orders for ${this.username}`);
      },
      error: (error: any) => {
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
