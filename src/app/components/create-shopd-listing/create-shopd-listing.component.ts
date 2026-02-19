import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ShopdListingFormComponent } from '../shopd-listing-form/shopd-listing-form.component';
import { CreateShopdListingService, ShopdListing } from '../../service/data/create-shopd-listing.service';
import { BasicAuthenticationService } from '../../service/app/basic-authentication.service';

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
  userId: string = '';
  isSubmitting: boolean = false;
  errorMessage: string = '';

  ngOnInit(): void {
    this.username = this.authService.getAuthenticatedUser() || '';
    this.userId = this.authService.getAuthenticatedUserId() || '';
    
    if (!this.username) {
      this.router.navigate(['login']);
    }
  }

  onCreateListing(formData: any) {
    if (this.isSubmitting) return;
    
    this.isSubmitting = true;
    this.errorMessage = '';

    const listing: ShopdListing = {
      id: formData.id || 0, // ID will be set by backend
      name: formData.itemName,
      description: formData.description,
      price: formData.price,
      imageUrl: formData.imageUrl,
      category: formData.category,
      available : true,
      quantity : 1,
      userId : this.userId
    };

    console.log('Creating listing with data:', listing);

    this.createShopdListingService.uploadListingWithPhoto(this.userId, listing, formData.photo)
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
