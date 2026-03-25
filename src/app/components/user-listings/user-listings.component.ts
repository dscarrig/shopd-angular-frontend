import { Component, OnInit, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ShopItemService } from 'src/app/service/data/shop-item.service';
import { ShopdItem } from '../../app.classes';

@Component({
  selector: 'app-user-listings',
  templateUrl: './user-listings.component.html',
  styleUrls: ['./user-listings.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class UserListingsComponent {
  @Input() userId?: string;
  allUserListings: ShopdItem[] = [];
  isLoading: boolean = false;
  errorMessage: string = '';

  private shopItemService = inject(ShopItemService);
  private router = inject(Router);

  ngOnInit(): void {
    // Initialize user listings for the given userId
    if (this.userId) {
      this.loadUserListings();
    }
    else {
      this.errorMessage = 'No user ID provided to load user listings.';
    }
  }

  private loadUserListings(): void {
    if (!this.userId) {
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    this.shopItemService.getUserListings(this.userId).subscribe({
      next: (listings: ShopdItem[]) => {
        this.allUserListings = listings;
        this.isLoading = false;
        console.log(`Loaded ${listings.length} listings for user ID ${this.userId}`);
      },
      error: (error: any) => {
        console.error('Error loading user listings:', error);
        this.errorMessage = 'Failed to load user listings. Please try again later.';
        this.isLoading = false;
      }
    });
  }

  hasListings(): boolean {
    return this.allUserListings && this.allUserListings.length > 0;
  }

  viewItem(itemId: string): void {
    this.router.navigate(['/shop-item', itemId]);
  }

}
