import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BasicAuthenticationService } from '../../service/app/basic-authentication.service';
import { CartService } from '../../service/app/cart.service';
import { MessageService } from '../../service/data/message.service';

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
  private messageService = inject(MessageService);

  itemsInCart: number = 0;
  unreadMessages: number = 0;
  userName: string = 'guest';

  ngOnInit(): void {
    this.updateUsername();
    this.subscribeToCartCount();
    this.subscribeToAuthChanges();
    this.subscribeToUnreadCount();
    this.refreshCartCount();
    this.refreshUnreadCount();
  }

  // Method to refresh the menu, typically called when there are changes in authentication status or cart contents. It updates the displayed username and cart item count accordingly.
  refreshMenu() {
    this.updateUsername();
    this.refreshCartCount();
    this.refreshUnreadCount();
  }

  private subscribeToCartCount(): void {
    this.cartService.cartItemCount$.subscribe(
      count => this.itemsInCart = count
    );
  }

  private subscribeToUnreadCount(): void {
    this.messageService.unreadCount$.subscribe(
      count => this.unreadMessages = count
    );
  }

  private subscribeToAuthChanges(): void {
    this.authenticationService.authenticationChanged$.subscribe(username => {
      this.userName = username;
      this.refreshCartCount();
      this.refreshUnreadCount();
    });
  }

  private refreshCartCount(): void {
    const userId = this.authenticationService.getAuthenticatedUserId();
    if (userId) {
      this.cartService.refreshCartCount(userId);
    }
  }

  private refreshUnreadCount(): void {
    const userId = this.authenticationService.getAuthenticatedUserId();
    if (userId && this.authenticationService.isUserLoggedIn()) {
      this.messageService.refreshUnreadCount(userId);
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