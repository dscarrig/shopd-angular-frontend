import { Component, inject } from '@angular/core';
import { OrderHistoryComponent } from '../order-history/order-history.component';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BasicAuthenticationService } from 'src/app/service/app/basic-authentication.service';
import { Order, OrderItem, ShopdItem } from 'src/app/app.classes';
import { OrderService } from 'src/app/service/data/order.service';

@Component({
  selector: 'app-order-status',
  imports: [CommonModule, OrderHistoryComponent, RouterLink],
  templateUrl: './order-status.component.html',
  styleUrls: ['./order-status.component.css']
})
export class OrderStatusComponent {
  private basicAuthenticationService = inject(BasicAuthenticationService);
  private orderService = inject(OrderService);
  username: string = '';
  userId: string = '';
  userListedOrders: OrderItem[] = [];
  userListedItems: ShopdItem[] = [];

  ngOnInit(): void {
    this.refreshAccountInfo();
  }

  refreshAccountInfo() {
    this.username = this.basicAuthenticationService.getAuthenticatedUser() || '';
    this.userId = this.basicAuthenticationService.getAuthenticatedUserId() || '';
    if (this.userId) {
      this.orderService.getUsersListedOrders(this.userId).subscribe((orders) => {
        console.log('Fetched user listed orders:', orders);
        this.userListedOrders = orders;
        console.log('User listed orders set to:', this.userListedOrders);
        //// Fetch the corresponding shop items for each order item
        //orders.forEach((orderItem) => {
        //  this.orderService.getShopItemByOrderItemId(orderItem.itemId).subscribe((shopItem) => {
        //    this.userListedItems.push(shopItem);
        //  });
        //});
      });
    }
  }

  updateStatus(item: OrderItem, event: Event): void {
    const newStatus = (event.target as HTMLSelectElement).value;
    this.orderService.updateOrderItemStatus(item.id, newStatus).subscribe(() => {
      item.status = newStatus;
    });
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  }
}
