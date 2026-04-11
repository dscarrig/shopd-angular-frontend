import { Component, inject } from '@angular/core';
import { ShopItemService } from '../../service/data/shop-item.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { BasicAuthenticationService } from '../../service/app/basic-authentication.service';
import { UserInfoService } from '../../service/app/user-info.service';
import { ShopdItem } from '../../app.classes';
import { CommonModule } from '@angular/common';
import { CartService } from 'src/app/service/app/cart.service';

@Component({
  selector: 'app-shop-item',
  templateUrl: './shop-item.component.html',
  styleUrls: ['./shop-item.component.css'],
  imports: [CommonModule, RouterLink]
})
export class ShopItemComponent {
  private shopItemService: ShopItemService = inject(ShopItemService);
  private route: ActivatedRoute = inject(ActivatedRoute);
  private router: Router = inject(Router);
  private authenticationService: BasicAuthenticationService = inject(BasicAuthenticationService);
  private userInfoService: UserInfoService = inject(UserInfoService);
  private cartService: CartService = inject(CartService);

  shopItems!: ShopdItem[];
  username: string = '';
  userId: string = '';

  id: string = this.route.snapshot.params['id'];
  name: string = '';
  description: string = '';
  price: number = 0;
  imageUrl: string = '';
  shopItem: ShopdItem = new ShopdItem(this.id, this.name, this.description, this.price, this.imageUrl, '', false, 0, '');

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.shopItem = new ShopdItem(this.id, this.name, this.description, this.price, this.imageUrl, '', false, 0, '');

    if (this.id !== '-1') {
      this.shopItemService.retrieveItem(this.id).subscribe(
        (data: ShopdItem) => {
          this.shopItem = data;

          // Fetch username for the user who listed this item
          if (this.shopItem.userId) {
            this.userInfoService.getUsername(this.shopItem.userId).subscribe(
              (username: string) => {
                this.username = username;
                this.userId = this.shopItem.userId;
              },
              (error: any) => {
                console.error('Error fetching username:', error);
                this.username = 'Unknown User';
              }
            );
          }
        }
      );
    }
  }

  addItemToCart(item: ShopdItem) {
    const userId = this.authenticationService.getAuthenticatedUserId();
    if (userId) {
      this.cartService.addToCart(userId, item.id).subscribe();
      this.router.navigate(['/cart']);
    }
    else {
      console.error('User ID is not available. Cannot add item to cart.');
    }
  }

  isOwner(): boolean {
    const currentUserId = this.authenticationService.getAuthenticatedUserId();
    return currentUserId !== null && currentUserId === this.shopItem.userId;
  }

  modifyListing(): void {
    this.router.navigate(['/modify-shop-listing', this.shopItem.id]);
  }

}
