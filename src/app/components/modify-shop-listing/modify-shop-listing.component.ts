import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ShopdListingFormComponent } from '../shopd-listing-form/shopd-listing-form.component';
import { CreateShopdListingService, ShopdListing } from '../../service/data/create-shopd-listing.service';
import { ShopItemService } from '../../service/data/shop-item.service';
import { BasicAuthenticationService } from '../../service/app/basic-authentication.service';
import { ShopdItem } from '../../app.classes';

@Component({
  selector: 'app-modify-shop-listing',
  imports: [CommonModule, ShopdListingFormComponent],
  templateUrl: './modify-shop-listing.component.html',
  styleUrl: './modify-shop-listing.component.css',
  standalone: true
})
export class ModifyShopListingComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private shopItemService = inject(ShopItemService);
  private createShopdListingService = inject(CreateShopdListingService);
  private authService = inject(BasicAuthenticationService);

  itemId: string = '';
  userId: string = '';
  isLoading: boolean = true;
  isSubmitting: boolean = false;
  errorMessage: string = '';

  // Form initial values
  itemName: string = '';
  price: number | null = null;
  description: string = '';
  category: string = '';
  available: boolean = true;
  quantity: number | null = null;
  imageUrl: string = '';

  ngOnInit(): void {
    this.userId = this.authService.getAuthenticatedUserId() || '';
    this.itemId = this.route.snapshot.params['id'];

    if (!this.userId) {
      this.router.navigate(['login']);
      return;
    }

    // Fetch the existing item data
    this.shopItemService.retrieveItem(this.itemId).subscribe({
      next: (item: ShopdItem) => {
        // Check if the current user owns this item
        if (item.userId !== this.userId) {
          this.errorMessage = 'You do not have permission to modify this listing.';
          this.isLoading = false;
          return;
        }

        // Pre-populate form fields
        this.itemName = item.name;
        this.price = item.price;
        this.description = item.description;
        this.category = item.category;
        this.available = item.available;
        this.quantity = item.quantity;
        this.imageUrl = item.imageUrl;
        this.isLoading = false;
      },
      error: (error: any) => {
        console.error('Error loading item:', error);
        this.errorMessage = 'Failed to load item details.';
        this.isLoading = false;
      }
    });
  }

  onUpdateListing(formData: any) {
    if (this.isSubmitting) return;

    this.isSubmitting = true;
    this.errorMessage = '';

    const listing: ShopdListing = {
      id: parseInt(this.itemId),
      name: formData.itemName,
      description: formData.description,
      price: formData.price,
      imageUrl: this.imageUrl, // Keep existing URL if no new photo
      category: formData.category,
      available: formData.available !== undefined ? formData.available : this.available,
      quantity: formData.quantity !== null ? formData.quantity : this.quantity || 1,
      userId: this.userId
    };

    this.createShopdListingService.updateListingWithPhoto(this.itemId, listing, formData.photo)
      .subscribe({
        next: (result) => {
          this.router.navigate(['/shop-item', this.itemId]);
        },
        error: (error: any) => {
          console.error('Error updating listing:', error);
          this.errorMessage = 'Failed to update listing. Please try again.';
          this.isSubmitting = false;
        },
        complete: () => {
          this.isSubmitting = false;
        }
      });
  }

  onCancel() {
    this.router.navigate(['/shop-item', this.itemId]);
  }

  onDeleteListing() {
    const confirmDelete = confirm(
      `Are you sure you want to delete "${this.itemName}"? This action cannot be undone.`
    );

    if (!confirmDelete) {
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = '';

    this.shopItemService.deleteItem(this.userId, this.itemId).subscribe({
      next: () => {
        console.log('Listing deleted successfully');
        // Navigate to user listings or menu after successful deletion
        this.router.navigate(['/menu']);
      },
      error: (error: any) => {
        console.error('Error deleting listing:', error);
        this.errorMessage = 'Failed to delete listing. Please try again.';
        this.isSubmitting = false;
      },
      complete: () => {
        this.isSubmitting = false;
      }
    });
  }
}
