import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BasicAuthenticationService } from '../../service/app/basic-authentication.service';
import { CartService } from '../../service/app/cart.service';

/**
 * Component for the main menu of the application. It displays navigation options for users to access different parts of the application, such as home, shop, cart, and account management.
 * The component also displays the number of items in the user's cart and the username of the currently logged-in user.
 * It interacts with the BasicAuthenticationService to manage user authentication status and retrieve the authenticated user's information, and with the CartService to keep track of the number of items in the cart.
 * The component updates its display based on changes in authentication status and cart contents, ensuring that users have a seamless experience while navigating through the application.
 */
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

