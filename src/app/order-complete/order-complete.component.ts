import { Component, OnInit, inject } from '@angular/core';
import { CartService } from '../service/app/cart.service';
import { BasicAuthenticationService } from '../service/app/basic-authentication.service';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-order-complete',
  templateUrl: './order-complete.component.html',
  styleUrls: ['./order-complete.component.css']
})
export class OrderCompleteComponent implements OnInit {
  private cartService = inject(CartService);
  private basicAuthenticationService = inject(BasicAuthenticationService);
  private appComponent = inject(AppComponent);

  ngOnInit(): void {
    const username = this.basicAuthenticationService.getAuthenticatedUser();
    if (username) {
      this.cartService.deleteAllFromCart(username).subscribe(
        () => {
          this.appComponent.refreshMenu();
        }
      );
    }
  }

}
