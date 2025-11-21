import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BasicAuthenticationService } from '../service/app/basic-authentication.service';
import { CartService } from '../service/app/cart.service';
import { AppComponent } from '../app.component';
import { CommonModule } from '@angular/common';

export class ShopItem {
  constructor(
    public id: number,
    public itemName: string,
    public description: string,
    public price: number,
    public picture: string

  ) { }
}

export class CartItem {
  constructor(
    public item: ShopItem,
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
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  authenticationService = inject(BasicAuthenticationService);
  private appComponent = inject(AppComponent);


  shopItems: ShopItem[] = [];
  cartItems: CartItem[] = [];
  username: string | null = '';

  ngOnInit(): void {
    this.username = this.authenticationService.getAuthenticatedUser();
    this.shopItems = [new ShopItem(0, '0', '0', 0, '0')];
    this.refreshItems();
  }

  refreshItems() {
    if (!this.username) return;
    
    this.cartService.retrieveAllFromCart(this.username).subscribe(
      (response: ShopItem[]) => {
        this.shopItems = response;
        this.groupItems();
        this.appComponent.refreshMenu();
      }
    );
  }

  private groupItems() {
    const itemMap = new Map<number, CartItem>();
    
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
    if (!this.username) return;
    
    this.cartService.deleteFromCart(this.username, cartItem.item.id).subscribe(
      () => {
        this.refreshItems();
      }
    );
  }

  removeAllOfItem(cartItem: CartItem) {
    // Remove all instances of this item
    if (!this.username) return;
    
    const deleteObservables = [];
    for (let i = 0; i < cartItem.quantity; i++) {
      deleteObservables.push(
        this.cartService.deleteFromCart(this.username, cartItem.item.id)
      );
    }
      deleteObservables.push(
        this.cartService.deleteFromCart(this.username, cartItem.item.id)
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
