import { Component, inject } from '@angular/core';
import { UserListingsComponent } from '../user-listings/user-listings.component';
import { CommonModule } from '@angular/common';
import { UserInfoService } from 'src/app/service/app/user-info.service';
import { ActivatedRoute } from '@angular/router';
import { ShopdItem } from 'src/app/app.classes';
import { CartService } from 'src/app/service/app/cart.service';

@Component({
  selector: 'app-user-shop',
  imports: [CommonModule, UserListingsComponent],
  templateUrl: './user-shop.component.html',
  styleUrls: ['./user-shop.component.css']
})
export class UserShopComponent {
  private userInfoService = inject(UserInfoService);
  private route = inject(ActivatedRoute);
  private cartService: CartService = inject(CartService);

  username: string = '';
  userId: string = '';

  ngOnInit(): void {
    this.userId = this.route.snapshot.params['id'];
    this.userInfoService.getUsername(this.userId).subscribe({
      next: (username: string) => {
        this.username = username;
      },
      error: (error: any) => {
        console.error('Error fetching username:', error);
        this.username = 'Unknown Seller';
      }
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
}
