import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ShopdListingFormComponent } from '../shopd-listing-form/shopd-listing-form.component';
import { CreateShopdListingService, ShopdListing } from '../service/data/create-shopd-listing.service';
import { BasicAuthenticationService } from '../service/app/basic-authentication.service';

@Component({
  selector: 'app-create-shopd-listing',
  imports: [CommonModule, ShopdListingFormComponent],
  templateUrl: './create-shopd-listing.component.html',
  styleUrl: './create-shopd-listing.component.css',
})
export class CreateShopdListingComponent implements OnInit {
  private router = inject(Router);
  private createShopdListingService = inject(CreateShopdListingService);
  private authService = inject(BasicAuthenticationService);

  username: string = '';
  isSubmitting: boolean = false;
  errorMessage: string = '';

  ngOnInit(): void {
    this.username = this.authService.getAuthenticatedUser() || '';
    
    if (!this.username) {
      console.log('User not authenticated, redirecting to login');
      this.router.navigate(['login']);
    }
  }

  onCreateListing(formData: any) {
    console.log('Form data received:', formData);
    if (this.isSubmitting) return;
    
    this.isSubmitting = true;
    this.errorMessage = '';

    const listing: ShopdListing = {
      itemName: formData.itemName,
      price: formData.price,
      description: formData.description,
      username: this.username
    };

    console.log('Creating listing with data:', listing);

    this.createShopdListingService.uploadListingWithPhoto(this.username, listing, formData.photo)
      .subscribe({
        next: (result) => {
          console.log('Listing created successfully:', result);
          this.router.navigate(['menu']);
        },
        error: (error) => {
          console.error('Error creating listing:', error);
          this.errorMessage = 'Failed to create listing. Please try again.';
          this.isSubmitting = false;
        },
        complete: () => {
          this.isSubmitting = false;
        }
      });
  }

  backToMenu() {
    this.router.navigate(['menu']);
  }
}
