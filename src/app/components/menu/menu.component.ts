import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BasicAuthenticationService } from '../../service/app/basic-authentication.service';
import { CartService } from '../../service/app/cart.service';

@Component({
  selector: 'app-menu',
  imports: [CommonModule, RouterModule],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  private authenticationService = inject(BasicAuthenticationService);
  private cartService = inject(CartService);
  
  itemsInCart: number = 0;
  userName: string = 'guest';

  ngOnInit(): void {
    this.updateUsername();
    this.subscribeToCartCount();
    this.refreshCartCount();
  }

  refreshMenu() {
    this.updateUsername();
    this.refreshCartCount();
  }

  private subscribeToCartCount(): void {
    this.cartService.cartItemCount$.subscribe(
      count => this.itemsInCart = count
    );
  }

  private refreshCartCount(): void {
    const userId = this.authenticationService.getAuthenticatedUserId();
    if (userId) {
      this.cartService.refreshCartCount(userId);
    }
  }

  isLoggedIn(): boolean {
    return this.authenticationService.isUserLoggedIn();
  }

  private updateUsername() {
    const authenticatedUser = this.authenticationService.getAuthenticatedUser();
    this.userName = authenticatedUser || 'guest';
  }
}
