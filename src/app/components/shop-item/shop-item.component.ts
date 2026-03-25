import { Component, OnInit, inject } from '@angular/core';
import { ShopItemService } from '../../service/data/shop-item.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BasicAuthenticationService } from '../../service/app/basic-authentication.service';
import { UserInfoService } from '../../service/app/user-info.service';
import { ShopdItem } from '../../app.classes';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-shop-item',
  templateUrl: './shop-item.component.html',
  styleUrls: ['./shop-item.component.css'],
  imports: [CommonModule]
})
export class ShopItemComponent {
  private shopItemService: ShopItemService = inject(ShopItemService);
  private route: ActivatedRoute = inject(ActivatedRoute);
  private router: Router = inject(Router);
  private authenticationService: BasicAuthenticationService = inject(BasicAuthenticationService);
  private userInfoService: UserInfoService = inject(UserInfoService);

  shopItems!: ShopdItem[];
  username: string = '';

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
          console.log('Retrieved item:', this.shopItem);

          // Fetch username for the user who listed this item
          if (this.shopItem.userId) {
            this.userInfoService.getUsername(this.shopItem.userId).subscribe(
              (username: string) => {
                this.username = username;
                console.log('Retrieved username:', this.username);
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
      this.router.navigate(['/cart']);
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
