import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BasicAuthenticationService } from '../../service/app/basic-authentication.service';
import { UserInfoService } from '../../service/app/user-info.service';

@Component({
  selector: 'app-modify-payment-info',
  imports: [CommonModule, FormsModule],
  templateUrl: './modify-payment-info.component.html',
  styleUrl: './modify-payment-info.component.css'
})
export class ModifyPaymentInfoComponent implements OnInit {
  private router = inject(Router);
  private userInfoService = inject(UserInfoService);
  private basicAuthenticationService = inject(BasicAuthenticationService);

  userId: string = '';
  cardholderName: string = '';
  cardNumber: string = '';
  expirationMonth: string = '';
  expirationYear: string = '';
  cvv: string = '';
  cardType: string = '';

  cardTypes = ['Visa', 'MasterCard', 'American Express', 'Discover'];
  months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
  years: string[] = [];

  ngOnInit(): void {
    this.userId = this.basicAuthenticationService.getAuthenticatedUserId() || '';

    // Generate years for the next 20 years
    const currentYear = new Date().getFullYear();
    for (let i = 0; i < 20; i++) {
      this.years.push((currentYear + i).toString());
    }
  }

  onSavePaymentInfo(): void {
    if (!this.isFormValid()) {
      return;
    }

    const paymentInfo = {
      cardHolderName: this.cardholderName,
      cardNumber: this.cardNumber,
      expiryDate: `${this.expirationMonth}/${this.expirationYear}`,
      cvv: this.cvv
    };

    this.userInfoService.addPaymentInfo(this.userId, paymentInfo).subscribe(
      (response: any) => {
        console.log('Payment info added:', response);
        this.router.navigate(['my-account']);
      },
      (error: any) => {
        console.error('Error adding payment info:', error);
      }
    );
  }

  onCancel(): void {
    this.router.navigate(['my-account']);
  }

  isFormValid(): boolean {
    return this.allInputEntered() && this.allCorrectFormat();
  }

  allInputEntered(): boolean {
    return this.cardholderName !== '' &&
      this.cardNumber !== '' &&
      this.expirationMonth !== '' &&
      this.expirationYear !== '' &&
      this.cvv !== '' &&
      this.cardType !== '';
  }

  allCorrectFormat(): boolean {
    return this.cardNumberCorrectFormat() && this.cvvCorrectFormat();
  }

  cardNumberCorrectFormat(): boolean {
    if (this.cardNumber.length < 13 || this.cardNumber.length > 19) {
      return false;
    }
    return this.cardNumber.match(/^[0-9]+$/) !== null;
  }

  cvvCorrectFormat(): boolean {
    if (this.cvv.length < 3 || this.cvv.length > 4) {
      return false;
    }
    return this.cvv.match(/^[0-9]+$/) !== null;
  }
}
