import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserInfoService } from '../service/app/user-info.service';
import { BasicAuthenticationService } from '../service/app/basic-authentication.service';
import { Router } from '@angular/router';
import { OrderHistoryComponent } from '../order-history/order-history.component';

export class AccountDetailItem {
  constructor(
    public id: number,
    public username: string,
    public email: string,
    public accountType: string,
    public fullName: string,
    public address: string,
    public addressTwo: string,
    public city: string,
    public state: string,
    public zipCode: string,
    public cardNum: string,
    public isDefault: boolean

  ) { }
}

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
  accountDetailItem: AccountDetailItem = new AccountDetailItem(0, '', '', '', '', '', '', '', '', '', '', false);
  defaultAccountDetailItem: AccountDetailItem = new AccountDetailItem(0, '', '', '', '', '', '', '', '', '', '', false);
  allAccountDetailItems: AccountDetailItem[] = [];

  ngOnInit(): void {
    this.accountDetailItem = new AccountDetailItem(0, '', '', '', '', '', '', '', '', '', '', false);
    this.refreshAccountInfo();
  }

  refreshAccountInfo() {

    this.username = this.basicAuthenticationService.getAuthenticatedUser() || '';

    this.userInfoService.getUserAccountDetails(this.username).subscribe(
      (response: AccountDetailItem) => {
      this.accountDetailItem = response;
      this.defaultAccountDetailItem = this.accountDetailItem;
      }
    );

    this.userInfoService.getAllUsersAccountDetails(this.username).subscribe(
      (response: AccountDetailItem[]) => {
        this.allAccountDetailItems = response;
        this.allAccountDetailItems.reverse();
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

    const toDeleteString = `${toDelete.fullName}_${toDelete.email}_${toDelete.accountType}_${toDelete.address}_${toDelete.addressTwo}_${toDelete.city}_${toDelete.state}_${toDelete.zipCode}_${toDelete.cardNum}`;
    
    this.userInfoService.deleteUserDetail(this.username, toDeleteString).subscribe(
      () => {
        this.ngOnInit();
      }
    );

  }

  deleteCardNum() {

    let combinedInfo;

    if (this.accountDetailItem.fullName === ' ' || this.accountDetailItem.fullName === '') {
      combinedInfo = '_ _ _ _ _ _ -1';
    }
    else {
      combinedInfo = this.accountDetailItem.fullName + '_' + this.accountDetailItem.email + '_' + this.accountDetailItem.accountType + '_' + this.accountDetailItem.address + '_' + this.accountDetailItem.addressTwo + '_' + this.accountDetailItem.city + '_' + this.accountDetailItem.state + '_' + this.accountDetailItem.zipCode + '_-1';
    }

    this.userInfoService.addUserInfo(this.username, combinedInfo).subscribe(
      () => {
        this.ngOnInit();
      }
    );

  }

  setAsDefault(newDefault: AccountDetailItem) {
    const newDefaultString = `${newDefault.fullName}_${newDefault.email}_${newDefault.accountType}_${newDefault.address}_${newDefault.addressTwo}_${newDefault.city}_${newDefault.state}_${newDefault.zipCode}_${newDefault.cardNum}`;
    this.userInfoService.setDefaultDetail(this.username, newDefaultString).subscribe(
      () => {
        this.ngOnInit();
      }
    );
  }

  hasSavedAddress() {
    return this.checkIfValid(this.accountDetailItem.address);
  }

  hasSavedCardNum() {
    return this.checkIfValid(this.accountDetailItem.cardNum);
  }

  hasAddressLineTwo() {
    return (this.accountDetailItem.addressTwo != '' && this.accountDetailItem.addressTwo != ' ');
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
