import { Component, OnInit, inject } from '@angular/core';
import { ShopItemService } from '../service/data/shop-item.service';
import { BasicAuthenticationService } from '../service/app/basic-authentication.service';
import { CartService } from '../service/app/cart.service';
import { AppComponent } from '../app.component';
import { CommonModule } from '@angular/common';
import { ShopdItem } from '../app.constants';

@Component({
  selector: 'app-item-menu',
  templateUrl: './shop-item-menu.component.html',
  styleUrls: ['./shop-item-menu.component.css'],
  imports: [CommonModule]
})
export class ShopItemMenuComponent implements OnInit {
  private itemMenuService = inject(ShopItemService);
  private authenticationService = inject(BasicAuthenticationService);
  private cartService = inject(CartService);
  private appComponent = inject(AppComponent);


  shopItems: ShopdItem[] = [];
  userId!: string | null;

  ngOnInit(): void {
    if (this.authenticationService.isUserLoggedIn()) {
      this.userId = this.authenticationService.getAuthenticatedUserId();
      this.refreshItems();
      console.log('User is logged in with ID:', this.userId);
    }
    else {
      this.authenticationService.loginAsGuest().subscribe(
        (response: any) => {
          console.log(response);
          this.userId = this.authenticationService.getAuthenticatedUserId();
          this.refreshItems();
        }
      );
    }
  }

  refreshItems() {
    console.log('Fetching items from API...');
    this.itemMenuService.retrieveAllItems().subscribe(
      (response: ShopdItem[]) => {
        console.log('Items received:', response);
        this.shopItems = response;
      },
      (error: any) => {
        console.error('Error fetching items:', error);
        this.shopItems = [];
      }
    );
  }

  addItemToCart(item: ShopdItem) {
    console.log('Item object:', item);
    console.log('Item id:', item.id);
    console.log(`Added ${item.name} to cart`);

    if (this.userId) {
      this.cartService.addToCart(this.userId, item.id).subscribe(
        () => {
          this.appComponent.refreshMenu();
        }
      );
    }
    else {
      console.error('User ID is not available. Cannot add item to cart.');
    }

  }
}
