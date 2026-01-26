import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from '../../app.constants';

export interface ShopdListing {
  itemId: number,
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

  createListing(username: string, listing: ShopdListing): Observable<ShopdListing> {
    return this.http.post<ShopdListing>(`${API_URL}/listings/${username}`, listing);
  }

  uploadListingWithPhoto(username: string, listing: ShopdListing, photo: File | null): Observable<ShopdListing> {
    if (!photo) {
      return this.createListing(username, listing);
    }

    // Create FormData for multipart upload
    const formData = new FormData();
    formData.append('name', listing.name);
    formData.append('price', listing.price.toString());
    formData.append('description', listing.description);
    formData.append('photo', photo, photo.name);

    return this.http.post<ShopdListing>(`${API_URL}/listings/${username}/with-photo`, formData);
  }
}
