import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { switchMap } from 'rxjs';
import { Order, OrderItem } from 'src/app/app.classes';
import { UserInfoService } from 'src/app/service/app/user-info.service';
import { OrderService } from 'src/app/service/data/order.service';
import { ShopItemService } from 'src/app/service/data/shop-item.service';

@Component({
  selector: 'app-order-details',
  imports: [CommonModule, RouterLink],
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent {
  private orderService: OrderService = inject(OrderService);
  private shopItemService: ShopItemService = inject(ShopItemService);
  private userInfoService: UserInfoService = inject(UserInfoService);
  private route: ActivatedRoute = inject(ActivatedRoute);

  private orderId: string = this.route.snapshot.params['id'];

  order: Order | null = null;
  private sellerNameCache = new Map<string, string>();
  private sellerIdCache = new Map<string, string>();

  ngOnInit(): void {
    this.orderService.getOrder(this.orderId).subscribe(
      (data: any) => {
        this.order = data;
      },
      (error: any) => {
        console.error('Error fetching order details:', error);
      }
    );
  }

  getSellerName(item: OrderItem): string {
    if (this.sellerNameCache.has(item.itemId)) {
      return this.sellerNameCache.get(item.itemId)!;
    }

    this.sellerNameCache.set(item.itemId, 'Loading...');
    this.shopItemService.getUserIdByItemId(item.itemId).pipe(
      switchMap((sellerId: string) => {
        this.sellerIdCache.set(item.itemId, sellerId);
        return this.userInfoService.getUsername(sellerId);
      })
    ).subscribe({
      next: (userName: string) => {
        this.sellerNameCache.set(item.itemId, userName);
      },
      error: () => {
        console.error(`Error fetching seller name for itemId: ${item.itemId}`);
        this.sellerNameCache.set(item.itemId, 'Unknown Seller');
      }
    });
    return 'Loading...';
  }

  getSellerId(item: OrderItem): string {
    return this.sellerIdCache.get(item.itemId) || '';
  }

}
