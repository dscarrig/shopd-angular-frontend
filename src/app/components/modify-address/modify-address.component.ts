import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { BasicAuthenticationService } from '../../service/app/basic-authentication.service';
import { UserInfoService } from '../../service/app/user-info.service';
import { AccountDetailItem } from '../../app.classes';
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
  userId: string = '';
  initialAddressData?: AddressFormData;
  cardNum: string = '';

  ngOnInit(): void {
    this.userId = '';
    this.cardNum = '';
    this.loadAccountDetails();
  }

  loadAccountDetails() {
    this.userId = this.basicAuthenticationService.getAuthenticatedUserId() || '';
    //this.cardNum = this.basicAuthenticationService.getAuthenticatedUserCardNum() || '';
    this.userInfoService.getDefaultAddress(this.userId).subscribe(
      (response: AccountDetailItem) => {
        this.accountDetailItem = response;
      }
    );
  }

  onAddressSave(addressData: AddressFormData): void {
    const username = this.basicAuthenticationService.getAuthenticatedUser();
    if (!username) {
      return;
    }

    const updatedAccountDetail = new AccountDetailItem(
      '', // Use '0' or empty ID to signal creation of a new address
      addressData.fullName,
      addressData.street,
      addressData.streetLine2,
      addressData.city,
      addressData.state,
      addressData.zipCode,
      addressData.country,
      addressData.user = this.userId,
      false
    );

    this.userInfoService.addUserAddress(this.userId, updatedAccountDetail).subscribe(
      (response: any) => {
        this.router.navigate(['my-account']);
      }
    );
  }

  onCancel(): void {
    this.router.navigate(['my-account']);
  }
}
