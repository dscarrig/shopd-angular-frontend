import { Component, OnInit, inject } from '@angular/core';
import { ShopItemService } from '../../service/data/shop-item.service';
import { BasicAuthenticationService } from '../../service/app/basic-authentication.service';
import { CartService } from '../../service/app/cart.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ShopdItem } from '../../app.classes';
import { UserInfoService } from '../../service/app/user-info.service';

@Component({
  selector: 'app-item-menu',
  templateUrl: './shop-item-menu.component.html',
  styleUrls: ['./shop-item-menu.component.css'],
  imports: [CommonModule, RouterLink]
})
export class ShopItemMenuComponent implements OnInit {
  private itemMenuService: ShopItemService = inject(ShopItemService);
  private authenticationService: BasicAuthenticationService = inject(BasicAuthenticationService);
  private cartService: CartService = inject(CartService);
  private userInfoService: UserInfoService = inject(UserInfoService);

  shopItems: ShopdItem[] = [];
  userId!: string | null;
  sellerNames: Map<string, string> = new Map();

  ngOnInit(): void {
    if (this.authenticationService.isUserLoggedIn()) {
      this.userId = this.authenticationService.getAuthenticatedUserId();
      this.refreshItems();
    }
    else {
      this.authenticationService.loginAsGuest().subscribe(
        (response: any) => {
          this.userId = this.authenticationService.getAuthenticatedUserId();
          this.refreshItems();
        }
      );
    }
  }

  refreshItems() {
    this.itemMenuService.retrieveAllItems().subscribe(
      (response: ShopdItem[]) => {
        this.shopItems = response;
        this.loadSellerNames();
      },
      (error: any) => {
        console.error('Error fetching items:', error);
        this.shopItems = [];
      }
    );
  }

  loadSellerNames() {
    // Get unique seller IDs
    const uniqueSellerIds = [...new Set(this.shopItems.map(item => item.userId))];

    // Fetch username for each unique seller
    uniqueSellerIds.forEach(sellerId => {
      this.userInfoService.getUsername(sellerId).subscribe(
        (username: string) => {
          this.sellerNames.set(sellerId, username);
        },
        (error: any) => {
          this.sellerNames.set(sellerId, 'Unknown Seller');
        }
      );
    });
  }

  addItemToCart(item: ShopdItem) {
    if (this.userId) {
      this.cartService.addToCart(this.userId, item.id).subscribe();
    }
    else {
      console.error('User ID is not available. Cannot add item to cart.');
    }
  }

  getItemSeller(item: ShopdItem): string {
    return this.sellerNames.get(item.userId) || 'Loading...';
  }
}
