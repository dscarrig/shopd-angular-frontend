import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface AddressFormData {
  id?: string;
  fullName: string;
  street: string;
  street2: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

@Component({
  selector: 'app-address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class AddressFormComponent implements OnInit {
  @Input() initialData?: AddressFormData;
  @Input() submitButtonText = 'Submit';
  @Input() showCancelButton = true;
  @Input() cancelButtonText = 'Cancel';
  @Output() formSubmit = new EventEmitter<AddressFormData>();
  @Output() formCancel = new EventEmitter<void>();

  fullName: string = '';
  street: string = '';
  street2: string = '';
  city: string = '';
  state: string = '';
  zipCode: string = '';
  country: string = '';

  usStates = [
    'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
    'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
    'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
    'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
    'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
  ];

  ngOnInit(): void {
    if (this.initialData) {
      this.fullName = this.initialData.fullName;
      this.street = this.initialData.street;
      this.street2 = this.initialData.street2;
      this.city = this.initialData.city;
      this.state = this.initialData.state;
      this.zipCode = this.initialData.zipCode;
      this.country = this.initialData.country;
    }
  }

  onSubmit(): void {
    if (this.isFormValid()) {
      this.formSubmit.emit({
        fullName: this.fullName,
        street: this.street,
        street2: this.street2,
        city: this.city,
        state: this.state,
        zipCode: this.zipCode,
        country: this.country
      });
    }
  }

  onCancel(): void {
    this.formCancel.emit();
  }

  isFormValid(): boolean {
    return this.allInputEntered() && this.allCorrectFormat();
  }

  allInputEntered(): boolean {
    return this.fullName !== '' && this.street !== '' && this.city !== ''
      && this.state !== '' && this.zipCode !== '';
  }

  allCorrectFormat(): boolean {
    return this.zipCorrectFormat() && this.stateCorrectFormat();
  }

  stateCorrectFormat(): boolean {
    return this.state !== '' && this.usStates.includes(this.state);
  }

  zipCorrectFormat(): boolean {
    if (this.zipCode.length !== 5) {
      return false;
    }
    return this.zipCode.match(/^[0-9]+$/) !== null;
  }
}
