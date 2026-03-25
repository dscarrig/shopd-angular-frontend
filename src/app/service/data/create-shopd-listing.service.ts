import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { SHOPD_JPA_API_URL } from '../../app.constants';

export interface ShopdListing {
  id: number,
  name: string,
  description: string,
  price: number,
  imageUrl: string,
  category: string,
  available: boolean,
  quantity: number,
  userId: string
}

@Injectable({
  providedIn: 'root'
})
export class CreateShopdListingService {
  private http = inject(HttpClient);

  createListing(userId: string, listing: ShopdListing): Observable<ShopdListing> {
    return this.http.post<ShopdListing>(`${SHOPD_JPA_API_URL}/items/create-item/${userId}`, listing);
  }

  updateListing(itemId: string, listing: ShopdListing): Observable<ShopdListing> {
    return this.http.put<ShopdListing>(`${SHOPD_JPA_API_URL}/items/update-item/${itemId}`, listing);
  }

  uploadListingWithPhoto(userId: string, listing: ShopdListing, photo: File | null): Observable<ShopdListing> {
    console.log('Creating listing with photo. User ID: ' + userId + ', Listing Name: ' + listing.name + ', Photo: ' + photo);
    if (!photo) {
      return this.createListing(userId, listing);
    }

    return this.createListing(userId, listing).pipe(
      switchMap(createdListing => {
        const formData = new FormData();
        formData.append('file', photo);
        return this.http.post<ShopdListing>(`${SHOPD_JPA_API_URL}/items/${createdListing.id}/upload-image`, formData);
      })
    );
  }

  updateListingWithPhoto(itemId: string, listing: ShopdListing, photo: File | null): Observable<ShopdListing> {
    console.log('Updating listing with photo. Item ID: ' + itemId + ', Photo: ' + photo);
    if (!photo) {
      return this.updateListing(itemId, listing);
    }

    return this.updateListing(itemId, listing).pipe(
      switchMap(updatedListing => {
        const formData = new FormData();
        formData.append('file', photo);
        return this.http.post<ShopdListing>(`${SHOPD_JPA_API_URL}/items/${updatedListing.id}/upload-image`, formData);
      })
    );
  }

  deleteListing(listingId: number): Observable<void> {
    return this.http.delete<void>(`${SHOPD_JPA_API_URL}/items/${listingId}`);
  }
}
