import { Component, OnInit, inject } from '@angular/core';
import { ShopItemService } from '../service/data/shop-item.service';
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

@Component({
  selector: 'app-item-menu',
  templateUrl: './shop-item-menu.component.html',
  styleUrls: ['./shop-item-menu.component.css'],
  imports: [CommonModule]
})
export class ShopItemMenuComponent implements OnInit {
  private itemMenuService = inject(ShopItemService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private authenticationService = inject(BasicAuthenticationService);
  private cartService = inject(CartService);
  private appComponent = inject(AppComponent);


  shopItems: ShopItem[] = [];
  username!: string | null;

  ngOnInit(): void {
    if (this.authenticationService.isUserLoggedIn()) {
      this.username = this.authenticationService.getAuthenticatedUser();
      this.refreshItems();
    }
    else {
      this.authenticationService.loginAsGuest().subscribe(
        (response: any) => {
          console.log(response);
          this.username = this.authenticationService.getAuthenticatedUser();
          this.refreshItems();
        }
      );
    }
  }

  refreshItems() {
    console.log('Fetching items from API...');
    this.itemMenuService.retrieveAllItems().subscribe(
      (response: ShopItem[]) => {
        console.log('Items received:', response);
        this.shopItems = response;
      },
      (error: any) => {
        console.error('Error fetching items:', error);
        this.shopItems = [];
      }
    );
  }

  addItemToCart(item: ShopItem) {
    console.log(`Added ${item.itemName} to cart`);

    if (this.username) {
      this.cartService.addToCart(this.username, item.id).subscribe(
        () => {
          this.appComponent.refreshMenu();
        }
      );
    }

  }
}
