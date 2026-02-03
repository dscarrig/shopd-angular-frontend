import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BasicAuthenticationService } from '../../service/app/basic-authentication.service';
import { CartService } from '../../service/app/cart.service';
import { AppComponent } from '../../app.component';
import { CommonModule } from '@angular/common';
import { ShopdItem } from '../../app.classes';

export class CartItem {
  constructor(
    public item: ShopdItem,
    public quantity: number
  ) { }

  get totalPrice(): number {
    return this.item.price * this.quantity;
  }
}

@Component({
  selector: 'app-user-cart',
  templateUrl: './user-cart.component.html',
  styleUrls: ['./user-cart.component.css'],
  imports: [CommonModule]
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
    this.router.navigate(['verify-address']);
  }

}
