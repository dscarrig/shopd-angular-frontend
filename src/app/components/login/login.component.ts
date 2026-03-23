import { BasicAuthenticationService } from '../../service/app/basic-authentication.service';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../service/app/cart.service';
import { AppComponent } from '../../app.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

/**
 * Component for handling user login functionality. It provides a form for users to enter their username and password, and manages the authentication process using the BasicAuthenticationService.
 * The component also handles the transfer of any items in the cart from a guest session to the authenticated user's session upon successful login, ensuring a seamless shopping experience.
 * It provides navigation options for users to go to the account creation page if they don't have an account, and displays error messages for invalid login attempts.
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
    imports: [FormsModule, CommonModule]
})
export class LoginComponent {
  private router = inject(Router);
  private basicAuthenticationService = inject(BasicAuthenticationService);
  private cartService = inject(CartService);
  private appComponent = inject(AppComponent);

  username: string = '';
  userId: string = '';
  password: string = '';
  errorMessage: string = 'Invalid Credentials';
  invalidLogin: boolean = false;
  tempUserId: string = '33333333-3333-3333-3333-333333333333'; // Store guest user ID before login

  handleJWTAuthLogin() {
    // Capture the guest/temp userId BEFORE authentication overwrites it
    this.tempUserId = this.basicAuthenticationService.getAuthenticatedUserId() || '';
    
    this.basicAuthenticationService.executeJWTAuthenticationService(this.username, this.password)
      .subscribe(
      () => {
        this.userId = this.basicAuthenticationService.getAuthenticatedUserId() || '';
        this.transferTempCart();
        this.router.navigate(['home', this.userId]);
        this.invalidLogin = false;
        },
        (error: any) => {
          console.error('Login failed', error);
          this.invalidLogin = true;
        }
      );
  }

  goToCreateAccount() {
    this.router.navigate(['createaccount']);
  }

  transferTempCart() {
    // Only transfer if there was a temp user (guest)
    if (this.tempUserId) {
      this.cartService.copyTempCart(this.userId, this.tempUserId).subscribe(
        () => {
          this.appComponent.refreshMenu();
          this.cartService.deleteAllFromCart(this.tempUserId).subscribe();
        }
      );
    }
  }

}
