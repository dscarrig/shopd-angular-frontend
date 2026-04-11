import { Component, inject } from '@angular/core';
import { OrderHistoryComponent } from '../order-history/order-history.component';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { switchMap } from 'rxjs';
import { BasicAuthenticationService } from 'src/app/service/app/basic-authentication.service';
import { OrderItem, ShopdItem } from 'src/app/app.classes';
import { OrderService } from 'src/app/service/data/order.service';
import { UserInfoService } from 'src/app/service/app/user-info.service';

@Component({
  selector: 'app-order-status',
  imports: [CommonModule, OrderHistoryComponent, RouterLink],
  templateUrl: './order-status.component.html',
  styleUrls: ['./order-status.component.css']
})
export class OrderStatusComponent {
  private basicAuthenticationService = inject(BasicAuthenticationService);
  private orderService = inject(OrderService);
  private userInfoService = inject(UserInfoService);
  username: string = '';
  userId: string = '';
  userListedOrders: OrderItem[] = [];
  userListedItems: ShopdItem[] = [];
  buyerUsernames: Record<string, string> = {};
  buyerUserIds: Record<string, string> = {};

  ngOnInit(): void {
    this.refreshAccountInfo();
  }

  refreshAccountInfo() {
    this.username = this.basicAuthenticationService.getAuthenticatedUser() || '';
    this.userId = this.basicAuthenticationService.getAuthenticatedUserId() || '';
    if (this.userId) {
      this.orderService.getUsersListedOrders(this.userId).subscribe((orders) => {
        this.userListedOrders = orders;
        this.loadBuyerUsernames();
      });
    }
  }

  private loadBuyerUsernames(): void {
    this.userListedOrders.forEach(item => {
      this.orderService.getUserIdByOrderItemId(item.id).pipe(
        switchMap((buyerId: string) => {
          this.buyerUserIds[item.id] = buyerId;
          return this.userInfoService.getUsername(buyerId);
        })
      ).subscribe((username: string) => {
        this.buyerUsernames[item.id] = username;
      });
    });
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
