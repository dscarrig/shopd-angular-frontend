import { Component, OnInit, inject } from '@angular/core';
import { UserInfoService } from '../../service/app/user-info.service';
import { BasicAuthenticationService } from '../../service/app/basic-authentication.service';
import { Router } from '@angular/router';
import { AccountDetailItem } from '../../app.classes';

@Component({
  selector: 'app-verify-address',
  templateUrl: './verify-address.component.html',
  styleUrls: ['./verify-address.component.css']
})
export class VerifyAddressComponent implements OnInit {
  private userInfoService = inject(UserInfoService);
  private basicAuthenticationService = inject(BasicAuthenticationService);
  private router = inject(Router);

  username: string | null = '';
  userId: string = this.basicAuthenticationService.getAuthenticatedUserId() || '';
  accountDetailItem: AccountDetailItem = new AccountDetailItem('0', '', '', '', '', '', '', '', '', false);

  ngOnInit(): void {
    this.username = this.basicAuthenticationService.getAuthenticatedUser();

    if (this.username === null) {
      return;
    }
    
    this.userInfoService.getDefaultAccountDetail(this.userId).subscribe(
      (response: AccountDetailItem) => {
        this.accountDetailItem = response;
      }
    );
  }

  checkIfAddressSaved() {
    if (this.accountDetailItem.fullName === ' ' || this.accountDetailItem.fullName === ''
      || this.accountDetailItem.street === ' ' || this.accountDetailItem.street === ''
      || this.accountDetailItem.city === ' ' || this.accountDetailItem.city === ''
      || this.accountDetailItem.state === ' ' || this.accountDetailItem.state === ''
      || this.accountDetailItem.zipCode === ' ' || this.accountDetailItem.zipCode === ''
      || this.accountDetailItem.userId === ' ' || this.accountDetailItem.userId === '' || this.accountDetailItem.userId === '-1') {
      this.navigateToEnterUserInfo();
    }
  }

  navigateToEnterUserInfo() {
    this.router.navigate(['enter-user-info']);
  }

  navigateToConfirmCheckout() {
    this.router.navigate(['confirm-checkout']);
  }

}
