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
  defaultAccountDetailItem: AccountDetailItem = new AccountDetailItem('0', '', '', '', '', '', '', '', '', false);
  allAccountDetailItems: AccountDetailItem[] = [];

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
  }

  modifyAddress() {
    this.router.navigate(['modify-address']);
  }

  modifyCardNum() {
    this.router.navigate(['modify-card-num']);
  }

  deleteAddress(toDelete: AccountDetailItem) {
    
    this.userInfoService.deleteUserDetail(this.userId, toDelete.id).subscribe(
      () => {
        this.ngOnInit();
      }
    );
  }

  deleteCardNum() {
    // Card number is deleted along with address in this implementation
  }

  setAsDefault(newDefault: AccountDetailItem) {
    this.userInfoService.setDefaultAddress(this.userId, newDefault.id).subscribe(
      () => {
        this.ngOnInit();
      }
    );
  }

  hasSavedAddress() {
    return this.checkIfValid(this.accountDetailItem.street);
  }

  hasSavedCardNum() {
    return this.checkIfValid(this.accountDetailItem.zipCode);
  }

  hasAddressLineTwo() {
    return this.checkIfValid(this.accountDetailItem.streetLine2);
  }

  hasState() {
    return this.checkIfValid(this.accountDetailItem.state);
  }

  checkIfValid(toCheck: string) {
    if (toCheck === ' ' || toCheck === '' || toCheck === '-1') {
      return 0;
    }
    else {
      return 1;
    }
  }

  isDefaultAccountDetailItem(compare : any) {
    return compare.isDefault ? 1 : 0;
  }
}
