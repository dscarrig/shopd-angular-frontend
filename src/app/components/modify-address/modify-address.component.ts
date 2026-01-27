import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { BasicAuthenticationService } from '../../service/app/basic-authentication.service';
import { UserInfoService } from '../../service/app/user-info.service';
import { AccountDetailItem } from '../my-account/my-account.component';
import { AddressFormData, AddressFormComponent } from '../../shared/address-form/address-form.component';

@Component({
  selector: 'app-modify-address',
  templateUrl: './modify-address.component.html',
  styleUrls: ['./modify-address.component.css'],
  imports: [AddressFormComponent]
})
export class ModifyAddressComponent implements OnInit {
  private router = inject(Router);
  private userInfoService = inject(UserInfoService);
  private basicAuthenticationService = inject(BasicAuthenticationService);

  accountDetailItem!: AccountDetailItem;
  username = '';
  initialAddressData?: AddressFormData;

  ngOnInit(): void {
    this.accountDetailItem = new AccountDetailItem(0, '', '', '', '', '', '', '', '', '', '', false);

    this.username = this.basicAuthenticationService.getAuthenticatedUser() || '';

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
      }
    );
  }

  onAddressSave(addressData: AddressFormData): void {
    const username = this.basicAuthenticationService.getAuthenticatedUser();
    if (!username) {
      return;
    }
    
    let combinedInfo;

    if (this.accountDetailItem.cardNum === '' || this.accountDetailItem.cardNum === '-1') {
      combinedInfo = addressData.fullName + '_' + addressData.addressOne + '_' + addressData.addressTwo + '_' +
                    addressData.city + '_' + addressData.state + '_' + addressData.zipCode + '_-1';
    } else {
      combinedInfo = addressData.fullName + '_' + addressData.addressOne + '_' + addressData.addressTwo + '_' +
                    addressData.city + '_' + addressData.state + '_' + addressData.zipCode + '_' + this.accountDetailItem.cardNum;
    }

    this.userInfoService.addUserInfo(username, combinedInfo).subscribe(
      (response: any) => {
        console.log(response);
        this.router.navigate(['my-account']);
      }
    );
  }

  onCancel(): void {
    this.router.navigate(['my-account']);
  }
}
