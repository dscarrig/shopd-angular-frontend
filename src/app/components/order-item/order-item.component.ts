import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderItem } from 'src/app/app.classes';
import { UserInfoService } from 'src/app/service/app/user-info.service';
import { OrderService } from 'src/app/service/data/order.service';
import { ShopItemService } from 'src/app/service/data/shop-item.service';

@Component({
  selector: 'app-order-item',
  imports: [CommonModule],
  templateUrl: './order-item.component.html',
  styleUrls: ['./order-item.component.css']
})
export class OrderItemComponent {
  private orderService: OrderService = inject(OrderService);
  private shopItemService = inject(ShopItemService);
  private userInfoService = inject(UserInfoService);
  private route = inject(ActivatedRoute);

  orderItemId: string = '';
  orderItem?: OrderItem;
  sellerUsername: string = '';

  ngOnInit(): void {
    this.orderItemId = this.route.snapshot.params['id'];

    this.orderService.getOrderItemById(this.orderItemId).subscribe({
      next: (orderItem: OrderItem) => {
        this.orderItem = orderItem;
        this.loadSellerUsername();
      },
      error: (error: any) => {
        console.error('Error loading order item:', error);
      }
    });
  }

  private loadSellerUsername(): void {
    if (this.orderItem) {
      this.orderService.getUserIdByOrderItemId(this.orderItem.id).subscribe({
        next: (userId: string) => {
          this.userInfoService.getUsername(userId).subscribe({
            next: (username: string) => {
              this.sellerUsername = username;
            },
            error: (error: any) => {
              console.error('Error loading seller username:', error);
            }
          });
        },
        error: (error: any) => {
          console.error('Error loading user ID by order item ID:', error);
        }
      });
    }
  }
}
