import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserInfoService } from '../../service/app/user-info.service';
import { BasicAuthenticationService } from '../../service/app/basic-authentication.service';
import { Router } from '@angular/router';
import { OrderHistoryComponent } from '../order-history/order-history.component';
import { AccountDetailItem } from '../../app.classes';
import { UserListingsComponent } from "../user-listings/user-listings.component";

/**
 * Component for managing the user's account information. It displays the user's default account details, such as their address and payment information, and provides options to modify or delete this information.
 * The component interacts with the UserInfoService to retrieve and manage the user's account details, and with the BasicAuthenticationService to obtain the authenticated user's information.
 * It also provides navigation options for users to modify their address or card number, and handles the deletion of account details with appropriate updates to the displayed information.
 * The component includes methods to check for the presence of saved addresses and card numbers, and to determine if the current account detail item is the default one.
 */
@Component({
  selector: 'app-my-account',
  imports: [CommonModule, OrderHistoryComponent, UserListingsComponent],
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent implements OnInit {
  private userInfoService = inject(UserInfoService);
  private basicAuthenticationService = inject(BasicAuthenticationService);
  private router = inject(Router);

  username: string = '';
  userId: string = '';
  accountDetailItem: AccountDetailItem = new AccountDetailItem('0', '', '', '', '', '', '', '', '', false);
  defaultPaymentInfo: any = null;

  ngOnInit(): void {
    this.refreshAccountInfo();
  }

  refreshAccountInfo() {
    this.username = this.basicAuthenticationService.getAuthenticatedUser() || '';
    this.userId = this.basicAuthenticationService.getAuthenticatedUserId() || '';

    this.userInfoService.getDefaultAccountDetail(this.userId).subscribe(
      (response: AccountDetailItem) => {
        this.accountDetailItem = response;
      }
    );

    this.userInfoService.getDefaultPaymentInfo(this.userId).subscribe(
      (response: any) => {
        this.defaultPaymentInfo = response;
      },
      (error: any) => {
        console.log('No payment info found or error:', error);
        this.defaultPaymentInfo = null;
      }
    );
  }

  modifyAddress() {
    this.router.navigate(['modify-address']);
  }

  modifyPaymentInfo() {
    this.router.navigate(['modify-payment-info']);
  }

  getDefaultPaymentInfo(): string {
    return this.defaultPaymentInfo?.lastFourDigits || '';
  }

  deleteAddress(toDelete: AccountDetailItem) {
    this.userInfoService.deleteUserAddress(this.userId, toDelete.id).subscribe(
      () => {
        this.ngOnInit();
      }
    );
  }

  deleteCardNum() {
    if (this.defaultPaymentInfo && this.defaultPaymentInfo.id) {
      this.userInfoService.deletePaymentInfo(this.userId, this.defaultPaymentInfo.id).subscribe(
        () => {
          this.defaultPaymentInfo = null;
          this.refreshAccountInfo();
        },
        (error: any) => {
          console.error('Error deleting payment info:', error);
        }
      );
    }
  }

  setAsDefault(newDefault: AccountDetailItem) {
    this.userInfoService.setDefaultAddress(this.userId, newDefault.id).subscribe(
      () => {
        this.ngOnInit();
      }
    );
  }

  hasSavedAddress(): boolean {
    return this.isValid(this.accountDetailItem.street);
  }

  hasSavedCardNum(): boolean {
    return this.defaultPaymentInfo !== null &&
      this.defaultPaymentInfo?.lastFourDigits !== undefined &&
      this.defaultPaymentInfo?.lastFourDigits !== '';
  }

  hasAddressLineTwo(): boolean {
    return this.isValid(this.accountDetailItem.streetLine2);
  }

  hasState(): boolean {
    return this.isValid(this.accountDetailItem.state);
  }

  isValid(value: string): boolean {
    return value !== ' ' && value !== '' && value !== '-1';
  }

  isDefaultAccountDetailItem(compare: AccountDetailItem): boolean {
    return compare.isDefault;
  }
}