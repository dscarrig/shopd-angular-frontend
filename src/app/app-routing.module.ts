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
import { RouteGuardService } from './service/app/route-guard.service';
import { EnterUserInfoComponent } from './enter-user-info/enter-user-info.component';
import { MyAccountComponent } from './my-account/my-account.component';
import { OrderCompleteComponent } from './order-complete/order-complete.component';
import {CreateShopdListingComponent} from './create-shopd-listing/create-shopd-listing.component'


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
  { path: 'home', component: HomeComponent, canActivate: [RouteGuardService] },
  { path: 'home/:name', component: HomeComponent, canActivate: [RouteGuardService] },
  { path: 'enter-user-info', component: EnterUserInfoComponent, canActivate: [RouteGuardService] },
  { path: 'my-account', component: MyAccountComponent, canActivate: [RouteGuardService] },
  { path: 'confirm-checkout', component: ConfirmCheckoutComponent, canActivate: [RouteGuardService] },
  { path: 'order-complete', component: OrderCompleteComponent, canActivate: [RouteGuardService] },
  { path: 'create-shopd-listing', component: CreateShopdListingComponent, canActivate: [RouteGuardService] },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
