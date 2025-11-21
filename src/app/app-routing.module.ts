import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import { ShopItemComponent } from './shop-item/shop-item.component';
import { SuccessComponent } from './success/success.component';
import { UserCartComponent } from './user-cart/user-cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { LogoutComponent } from './logout/logout.component';
import { ConfirmCheckoutComponent } from './confirm-checkout/confirm-checkout.component';
import { ShopItemMenuComponent } from './shop-item-menu/shop-item-menu.component';


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'createaccount', component: CreateAccountComponent },
  { path: 'createaccount/:id', component: CreateAccountComponent },
  { path: 'shopitem/:id', component: ShopItemComponent },
  { path: 'success', component: SuccessComponent },
  { path: 'cart', component: UserCartComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'userdetails', component: UserDetailsComponent },
  { path: 'confirmcheckout', component: ConfirmCheckoutComponent },
  { path: 'menu', component: ShopItemMenuComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
