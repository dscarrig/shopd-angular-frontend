import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserInfoService } from '../../service/app/user-info.service';
import { BasicAuthenticationService } from '../../service/app/basic-authentication.service';
import { Router } from '@angular/router';
import { OrderHistoryComponent } from '../order-history/order-history.component';
import { AccountDetailItem } from '../../app.classes';

@Component({
  selector: 'app-my-account',
  imports: [CommonModule, OrderHistoryComponent],
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

  ngOnInit(): void {
    this.refreshAccountInfo();
  }

  refreshAccountInfo() {
    this.username = this.basicAuthenticationService.getAuthenticatedUser() || '';
    this.userId = this.basicAuthenticationService.getAuthenticatedUserId() || '';

    this.userInfoService.getDefaultAccountDetail(this.userId).subscribe(
      (response: AccountDetailItem) => {
        this.accountDetailItem = response;
        console.log('Loaded default account details:', this.accountDetailItem);
      }
    );
  }

  modifyAddress() {
    this.router.navigate(['modify-address']);
  }

  modifyCardNum() {
    this.router.navigate(['modify-card-num']);
  }

  deleteAddress(toDelete: AccountDetailItem) {
    this.userInfoService.deleteUserAddress(this.userId, toDelete.id).subscribe(
      () => {
        this.ngOnInit();
      }
    );
  }

  deleteCardNum() {
    // Assuming we have a way to identify the card number to delete, we would call a similar method in the service.
    // For example:
    // this.userInfoService.deleteUserCardNum(this.userId, cardNumId).subscribe(
    //   () => {
    //     this.ngOnInit();
    //   }
    // );
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
    return this.isValid(this.accountDetailItem.zipCode);
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