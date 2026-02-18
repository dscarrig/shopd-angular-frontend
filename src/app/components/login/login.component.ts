import { BasicAuthenticationService } from '../../service/app/basic-authentication.service';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../service/app/cart.service';
import { AppComponent } from '../../app.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

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

  username = '';
  userId = '';
  password = '';
  errorMessage = 'Invalid Credentials';
  invalidLogin = false;
  tempUserId = '33333333-3333-3333-3333-333333333333'; // Store guest user ID before login

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
