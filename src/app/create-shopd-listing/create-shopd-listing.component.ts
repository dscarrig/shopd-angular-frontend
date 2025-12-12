import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopdListingFormComponent } from '../shopd-listing-form/shopd-listing-form.component';

@Component({
  selector: 'app-create-shopd-listing',
  imports: [CommonModule, ShopdListingFormComponent],
  templateUrl: './create-shopd-listing.component.html',
  styleUrl: './create-shopd-listing.component.css',
})
export class CreateShopdListingComponent {

  onCreateListing(formData: any) {
    // Logic to handle the creation of a new SHOP'D listing
    console.log('Creating listing with data:', formData);
  }

  backToMenu() {
    // Logic to navigate back to the menu
    console.log('Navigating back to menu');
  }
}
