import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SHOPD_JPA_API_URL } from '../../app.constants';

export interface ShopdListing {
  id: number,
  name: string,
  description: string,
  price: number,
  imageUrl: string,
  category: string,
  available : boolean,
  quantity : number,
  userId : string
}

@Injectable({
  providedIn: 'root'
})
export class CreateShopdListingService {
  private http = inject(HttpClient);

  createListing(userId: string, listing: ShopdListing): Observable<ShopdListing> {
    return this.http.post<ShopdListing>(`${SHOPD_JPA_API_URL}/items/create-item/${userId}`, listing);
  }

  uploadListingWithPhoto(userId: string, listing: ShopdListing, photo: File | null): Observable<ShopdListing> {
    if (!photo) {
      return this.createListing(userId, listing);
    }

    // Create FormData for multipart upload
    const formData = new FormData();
    formData.append('name', listing.name);
    formData.append('price', listing.price.toString());
    formData.append('description', listing.description);
    formData.append('image_url', photo, photo.name);
    formData.append('category', listing.category);
    formData.append('available', listing.available.toString());
    formData.append('quantity', listing.quantity.toString());
    formData.append('userId', userId);

    return this.http.post<ShopdListing>(`${SHOPD_JPA_API_URL}/items/create-item/${userId}`, formData);
  }
}
