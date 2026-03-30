import { Component, OnInit, inject } from '@angular/core';
import { UserInfoService } from '../../service/app/user-info.service';
import { BasicAuthenticationService } from '../../service/app/basic-authentication.service';
import { Router } from '@angular/router';
import { AccountDetailItem, ShopdItem } from '../../app.classes';
import { CartService } from '../../service/app/cart.service';
import { OrderService, Order } from '../../service/app/order.service';
import { CommonModule } from '@angular/common';

export class CartItem {
  constructor(
    public item: ShopdItem,
    public quantity: number
  ) { }

  get totalPrice(): number {
    return this.item.price * this.quantity;
  }
}

/**
 * Component for confirming the checkout process. It displays the user's default account details, the items in the cart, and allows the user to complete their order.
 * The component interacts with various services to retrieve user information, manage the cart, and create orders. It also handles the submission of the order and provides feedback to the user based on the success or failure of the order creation process.
 * The component ensures that the user has a valid card number before allowing them to complete the order and prevents multiple submissions of the same order.
 */
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
  cartItems: CartItem[] = [];
  isSubmittingOrder = false;
  defaultPaymentInfo: any = null;

  ngOnInit(): void {
    this.username = this.basicAuthenticationService.getAuthenticatedUser() || '';
    this.userId = this.basicAuthenticationService.getAuthenticatedUserId() || '';
    this.shopItems = [new ShopdItem('0', '0', '0', 0, '0', '0', false, 0, '0')];

    this.userInfoService.getUserAddress(this.userId).subscribe(
      (response: AccountDetailItem) => {
        this.accountDetailItem = response;
      },
      (error: any) => {
        console.error('Error fetching account details:', error);
        this.accountDetailItem = new AccountDetailItem('0', '', '', '', '', '', '', '', '', false);
      }
    );

    this.userInfoService.getDefaultPaymentInfo(this.userId).subscribe(
      (response: any) => {
        console.log('Default payment info retrieved:', response);
        this.defaultPaymentInfo = response;
      },
      (error: any) => {
        console.log('No payment info found or error:', error);
        this.defaultPaymentInfo = null;
      }
    );

    this.refreshItems();
  }

  refreshItems(): void {
    this.cartService.retrieveAllFromCart(this.userId).subscribe(
      (response: ShopdItem[]) => {
        this.shopItems = response;
        this.groupItems();
      },
      (error: any) => {
        console.error('Error loading cart items:', error);
        this.shopItems = [];
        this.cartItems = [];
      }
    );
  }

  private groupItems(): void {
    const itemMap = new Map<string, CartItem>();

    this.shopItems.forEach(item => {
      if (itemMap.has(item.id)) {
        const cartItem = itemMap.get(item.id)!;
        cartItem.quantity++;
      } else {
        itemMap.set(item.id, new CartItem(item, 1));
      }
    });

    this.cartItems = Array.from(itemMap.values()
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
    const orderItems: ShopdItem[] = Array.from(itemMap.values()).map(({ item, quantity }) => ({
      id: item.id,
      name: item.name,
      description: item.description,
      category: item.category,
      available: item.available,
      quantity: quantity,
      price: item.price,
      imageUrl: item.imageUrl,
      userId: item.userId
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
        // show an error message to the user here
        alert('Failed to create order. Please try again.');
      }
    });
  }

  backToCart(): void {
    this.router.navigate(['cart']);
  }

  cardNumCorrectFormat(): boolean {
    const cardNum = this.basicAuthenticationService.getAuthenticatedUserCardNum();
    const cardNumPattern = /^\d{16}$/; // Simple pattern for 16 digit card number

    return cardNum !== null && cardNumPattern.test(cardNum);
  }

  navigateToModifyPaymentInfo(): void {
    this.router.navigate(['modify-payment-info'], { queryParams: { returnUrl: 'confirm-checkout' } });
  }

}
