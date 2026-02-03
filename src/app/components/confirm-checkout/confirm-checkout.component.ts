import { Component, OnInit, inject } from '@angular/core';
import { UserInfoService } from '../../service/app/user-info.service';
import { BasicAuthenticationService } from '../../service/app/basic-authentication.service';
import { Router } from '@angular/router';
import { AccountDetailItem, ShopdItem } from '../../app.classes';
import { CartService } from '../../service/app/cart.service';
import { OrderService, Order, OrderItem } from '../../service/app/order.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-confirm-checkout',
  templateUrl: './confirm-checkout.component.html',
  styleUrls: ['./confirm-checkout.component.css'],
  imports: [CommonModule]
})
export class ConfirmCheckoutComponent implements OnInit {
  private userInfoService = inject(UserInfoService);
  private basicAuthenticationService = inject(BasicAuthenticationService);
  private router = inject(Router);
  private cartService = inject(CartService);
  private orderService = inject(OrderService);

  username!: string;
  userId!: string;
  accountDetailItem!: AccountDetailItem;
  shopItems!: ShopdItem[];
  isSubmittingOrder = false;
  cardNum: string = '';

  cardNumCorrectFormat(): boolean {
    const cardNum = this.basicAuthenticationService.getAuthenticatedUserCardNum();
    const cardNumPattern = /^\d{16}$/; // Simple pattern for 16 digit card number

    return cardNum !== null && cardNumPattern.test(cardNum);
  }

  ngOnInit(): void {
    this.username = this.basicAuthenticationService.getAuthenticatedUser() || '';
    this.userId = this.basicAuthenticationService.getAuthenticatedUserId() || '';
    this.shopItems = [new ShopdItem('0', '0', '0', 0, '0', '0', false, 0, '0')];
    
    this.userInfoService.getDefaultAccountDetail(this.userId).subscribe(
      (response: AccountDetailItem) => {
        this.accountDetailItem = response;
      }
    );
    
    this.refreshItems();
  }

  refreshItems(): void {
    this.cartService.retrieveAllFromCart(this.userId).subscribe(
      (response: ShopdItem[]) => {
        console.log('Cart items loaded:', response);
        this.shopItems = response;
      },
      (error: any) => {
        console.error('Error loading cart items:', error);
        this.shopItems = [];
      }
    );
  }

  getCartTotal(): number {
    if (!this.shopItems || this.shopItems.length === 0) {
      return 0;
    }
    
    let total = 0;
    let i;

    for (i = 0; i < this.shopItems.length; i++) {
      total = total + this.shopItems[i].price;
    }

    return total;
  }

  orderComplete(): void {
    // Prevent multiple submissions
    if (this.isSubmittingOrder) {
      return;
    }

    this.isSubmittingOrder = true;

    // Group items by ID and count quantities
    const itemMap = new Map<string, { item: ShopdItem, quantity: number }>();
    
    this.shopItems.forEach(item => {
      if (itemMap.has(item.id)) {
        const existing = itemMap.get(item.id)!;
        existing.quantity++;
      } else {
        itemMap.set(item.id, { item: item, quantity: 1 });
      }
    });

    // Create order items with proper quantities
    const orderItems: OrderItem[] = Array.from(itemMap.values()).map(({ item, quantity }) => ({
      itemId: item.id,
      itemName: item.name,
      quantity: quantity,
      itemPrice: item.price
    }));

    // Create the order object
    const order: Order = {
      id: 0, // Will be set by backend
      username: this.username,
      date: new Date().toISOString(),
      status: 'PENDING',
      total: this.getCartTotal(),
      items: orderItems
    };

    // Send order to backend
    this.orderService.createOrder(order).subscribe({
      next: (createdOrder) => {
        console.log('Order created successfully:', createdOrder);
        this.isSubmittingOrder = false;
        this.router.navigate(['order-complete']);
      },
      error: (error) => {
        console.error('Error creating order:', error);
        this.isSubmittingOrder = false;
        // You might want to show an error message to the user here
        alert('Failed to create order. Please try again.');
      }
    });
  }

  backToCart(): void {
    this.router.navigate(['cart']);
  }

}
