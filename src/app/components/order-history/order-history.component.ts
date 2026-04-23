import { Component, OnInit, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Order, OrderItem } from 'src/app/app.classes';
import { RouterLink } from '@angular/router';
import { switchMap } from 'rxjs';
import { OrderService } from 'src/app/service/data/order.service';
import { ShopItemService } from 'src/app/service/data/shop-item.service';
import { UserInfoService } from 'src/app/service/app/user-info.service';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css'],
  standalone: true,
  imports: [CommonModule, RouterLink]
})
export class OrderHistoryComponent implements OnInit {
  @Input() username?: string;
  @Input() userId?: string;
  orders: Order[] = [];
  isLoading: boolean = false;
  errorMessage: string = '';

  private orderService: OrderService = inject(OrderService);
  private shopItemService = inject(ShopItemService);
  private userInfoService = inject(UserInfoService);
  sellerUsernames: Record<string, string> = {};
  sellerUserIds: Record<string, string> = {};

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

    this.orderService.getUserPurchaseHistory(this.userId).subscribe({
      next: (orders: Order[]) => {
        this.orders = orders;
        this.isLoading = false;
        this.loadSellerUsernames();
      },
      error: (error: any) => {
        console.error('Error loading order history:', error);
        this.errorMessage = 'No orders found or an error occurred while loading order history.';
        this.isLoading = false;
      }
    });
  }

  private loadSellerUsernames(): void {
    const uniqueItemIds = [...new Set(this.orders.flatMap(o => o.items.map(i => i.itemId)))];
    uniqueItemIds.forEach(itemId => {
      this.shopItemService.getUserIdByItemId(itemId).pipe(
        switchMap((userId: string) => {
          this.sellerUserIds[itemId] = userId;
          return this.userInfoService.getUsername(userId);
        })
      ).subscribe((username: string) => {
        this.sellerUsernames[itemId] = username;
      });
    });
  }

  hasOrders(): boolean {
    return this.orders && this.orders.length > 0;
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  }

  updateStatus(item: OrderItem, status: string): void {
    this.orderService.updateOrderItemStatus(item.id, status).subscribe(() => {
      item.status = status;
    });
  }
}
