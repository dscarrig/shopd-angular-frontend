import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { UserInfoService } from '../../service/app/user-info.service';
import { BasicAuthenticationService } from '../../service/app/basic-authentication.service';
import { AccountDetailItem } from '../../app.classes';
import { AddressFormData, AddressFormComponent } from '../../shared/address-form/address-form.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-enter-user-info',
  templateUrl: './enter-user-info.component.html',
  styleUrls: ['./enter-user-info.component.css'],
  imports: [CommonModule, FormsModule, AddressFormComponent]
})
export class EnterUserInfoComponent implements OnInit {
  private router = inject(Router);
  private userInfoService = inject(UserInfoService);
  private basicAuthenticationService = inject(BasicAuthenticationService);

  accountDetailItem!: AccountDetailItem;
  userId!: string;
  initialAddressData?: AddressFormData;
  creditCardNumber = '';

  ngOnInit(): void {
    this.userId = this.basicAuthenticationService.getAuthenticatedUser() || '';
    this.userInfoService.getDefaultAccountDetail(this.userId).subscribe(
      (response: AccountDetailItem) => {
        this.accountDetailItem = response;
      }
    );
    this.creditCardNumber = '';


    // Extract credit card number from accountDetailItem if available
    // Assuming accountDetailItem has a cardNum property
    // this.creditCardNumber = response.cardNum || '';

  }

  onCheckout(addressData: AddressFormData): void {
    if (!this.cardNumCorrectFormat()) {
      return;
    }

    const userId = this.basicAuthenticationService.getAuthenticatedUserId();
    
    const updatedAccountDetail = new AccountDetailItem(
      this.accountDetailItem.id,
      addressData.fullName,
      addressData.street,
      addressData.streetLine2,
      addressData.city,
      addressData.state,
      addressData.zipCode,
      addressData.country,
      this.creditCardNumber,
      true
    );

    if (userId) {
      this.userInfoService.addUserInfo(userId, updatedAccountDetail).subscribe(
        (response: any) => {
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
