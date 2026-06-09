import { Component, OnInit, inject } from '@angular/core';
import { CartService } from '../../service/app/cart.service';
import { BasicAuthenticationService } from '../../service/app/basic-authentication.service';
import { AppComponent } from '../../app.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-order-complete',
  imports: [RouterModule],
  templateUrl: './order-complete.component.html',
  styleUrls: ['./order-complete.component.css']
})
export class OrderCompleteComponent implements OnInit {
  private cartService = inject(CartService);
  private basicAuthenticationService = inject(BasicAuthenticationService);
  private appComponent = inject(AppComponent);

  ngOnInit(): void {
    const userId = this.basicAuthenticationService.getAuthenticatedUserId();
    console.log('Order completed for user:', userId);
    if (userId) {
      this.cartService.deleteAllFromCart(userId).subscribe(
        () => {
          console.log('Cart cleared successfully after order completion.');
          this.appComponent.refreshMenu();
        }
      );
    }
  }

}
