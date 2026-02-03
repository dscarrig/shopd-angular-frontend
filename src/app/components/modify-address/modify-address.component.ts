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
    this.userInfoService.getDefaultAccountDetail(this.userId).subscribe(
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
      this.accountDetailItem.id,
      addressData.fullName,
      addressData.street,
      addressData.street2,
      addressData.city,
      addressData.state,
      addressData.zipCode,
      addressData.country,
      this.cardNum === '' || this.cardNum === '-1' ? '-1' : this.cardNum,
      true
    );

    this.userInfoService.addUserInfo(this.userId, updatedAccountDetail).subscribe(
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
