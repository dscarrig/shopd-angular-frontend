import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { BasicAuthenticationService } from '../../service/app/basic-authentication.service';
import { CartService } from '../../service/app/cart.service';
import { AppComponent } from '../../app.component';
import { CommonModule } from '@angular/common';
import { ShopdItem } from '../../app.classes';
import { RouterLink } from '@angular/router';

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
 * Component for managing the user's shopping cart. It displays the items currently in the cart, allows users to remove items or adjust quantities, and provides options to proceed to checkout or return to the menu.
 * The component interacts with the CartService to retrieve the cart items for the authenticated user and to perform operations such as deleting items from the cart. It also uses the BasicAuthenticationService to obtain the user's information and ensure that cart operations are performed for the correct user.
 * The component includes methods to calculate the total price of the items in the cart and to navigate to other parts of the application, such as the login page or the checkout process.
 */
@Component({
  selector: 'app-user-cart',
  templateUrl: './user-cart.component.html',
  styleUrls: ['./user-cart.component.css'],
  imports: [CommonModule, RouterLink]
})
export class UserCartComponent implements OnInit {
  private cartService = inject(CartService);
  private router = inject(Router);
  authenticationService = inject(BasicAuthenticationService);
  private appComponent = inject(AppComponent);

  shopItems: ShopdItem[] = [];
  cartItems: CartItem[] = [];
  userId: string | null = '';

  ngOnInit(): void {
    this.shopItems = [new ShopdItem('0', '0', '0', 0, '0', '0', false, 0, '0')];
    this.refreshItems();
  }

  refreshItems() {
    this.userId = this.authenticationService.getAuthenticatedUserId();
    if (!this.userId) return;

    this.cartService.retrieveAllFromCart(this.userId).subscribe(
      (response: ShopdItem[]) => {
        this.shopItems = response;
        this.groupItems();
        this.appComponent.refreshMenu();
      }
    );
  }

  private groupItems() {
    const itemMap = new Map<string, CartItem>();

    this.shopItems.forEach(item => {
      if (itemMap.has(item.id)) {
        const cartItem = itemMap.get(item.id)!;
        cartItem.quantity++;
      } else {
        itemMap.set(item.id, new CartItem(item, 1));
      }
    });

    this.cartItems = Array.from(itemMap.values());
  }

  removeItemFromCart(cartItem: CartItem) {
    // Remove one instance of the item
    if (!this.userId) return;

    this.cartService.deleteFromCart(this.userId, cartItem.item.id).subscribe(
      () => {
        this.refreshItems();
      }
    );
  }

  removeAllOfItem(cartItem: CartItem) {
    // Remove all instances of this item
    if (!this.userId) return;

    const deleteObservables = [];
    for (let i = 0; i < cartItem.quantity; i++) {
      deleteObservables.push(
        this.cartService.deleteFromCart(this.userId, cartItem.item.id)
      );
    }
    deleteObservables.push(
      this.cartService.deleteFromCart(this.userId, cartItem.item.id)
    );

    // Execute all delete operations
    let completed = 0;
    deleteObservables.forEach(obs => {
      obs.subscribe(() => {
        completed++;
        if (completed === deleteObservables.length) {
          this.refreshItems();
        }
      });
    });
  }

  getCartTotal() {
    let total = 0;
    let i;

    for (i = 0; i < this.shopItems.length; i++) {
      total = total + this.shopItems[i].price;
    }

    return total;
  }

  getCartItemsNum() {
    return this.shopItems.length;
  }

  goToLogin() {
    this.router.navigate(['login']);
  }

  goToMenu() {
    this.router.navigate(['menu']);
  }

  payNow() {
    this.router.navigate(['confirm-checkout']);
  }

}
