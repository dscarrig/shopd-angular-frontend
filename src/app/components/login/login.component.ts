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

  handleJWTAuthLogin() {
    this.basicAuthenticationService.executeJWTAuthenticationService(this.username, this.password)
      .subscribe(
      () => {
        this.userId = this.basicAuthenticationService.getAuthenticatedUserId() || '';
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

  tranferTempCart() {
    this.cartService.copyTempCart(this.userId).subscribe(
      () => {
        this.appComponent.refreshMenu();
        this.cartService.deleteAllFromCart('temp').subscribe();
      }
    );
  }

}
