import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { UserInfoService } from '../service/app/user-info.service';
import { BasicAuthenticationService } from '../service/app/basic-authentication.service';
import { AccountDetailItem } from '../my-account/my-account.component';
import { AddressFormData, AddressFormComponent } from '../shared/address-form/address-form.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-enter-user-info',
  templateUrl: './enter-user-info.component.html',
  styleUrls: ['./enter-user-info.component.css'],
  imports: [FormsModule, AddressFormComponent]
})
export class EnterUserInfoComponent implements OnInit {
  private router = inject(Router);
  private userInfoService = inject(UserInfoService);
  private basicAuthenticationService = inject(BasicAuthenticationService);

  accountDetailItem!: AccountDetailItem;
  username!: string;
  initialAddressData?: AddressFormData;
  creditCardNumber = '';

  ngOnInit(): void {
    this.username = this.basicAuthenticationService.getAuthenticatedUser() || '';
    this.accountDetailItem = new AccountDetailItem(0, '', '', '', '', '', '', '', '', '', '', false);

    this.userInfoService.getUserAccountDetails(this.username).subscribe(
      (response: AccountDetailItem) => {
        this.accountDetailItem = response;
        this.initialAddressData = {
          fullName: response.fullName,
          addressOne: response.address,
          addressTwo: response.addressTwo,
          city: response.city,
          state: response.state,
          zipCode: response.zipCode
        };

        if (response.cardNum !== '-1') {
          this.creditCardNumber = response.cardNum;
        } else {
          this.creditCardNumber = '';
        }
      }
    );
  }

  onCheckout(addressData: AddressFormData): void {
    if (!this.cardNumCorrectFormat()) {
      return;
    }

    const username = this.basicAuthenticationService.getAuthenticatedUser();
    const combinedInfo = addressData.fullName + '_' + addressData.addressOne + '_' + addressData.addressTwo + '_' +
                        addressData.city + '_' + addressData.state + '_' + addressData.zipCode + '_' + this.creditCardNumber;

    if (username) {
      this.userInfoService.addUserInfo(username, combinedInfo).subscribe(
        (response: any) => {
          console.log(response);
          this.router.navigate(['confirm-checkout']);
        }
      );
    }
  }

  backToCart(): void {
    this.router.navigate(['cart']);
  }

  isCheckoutValid(): boolean {
    return this.creditCardNumber !== '' && this.cardNumCorrectFormat();
  }

  cardNumCorrectFormat(): boolean {
    if (this.creditCardNumber.length !== 16) {
      return false;
    }
    return this.creditCardNumber.match(/^[0-9]+$/) !== null;
  }
}
