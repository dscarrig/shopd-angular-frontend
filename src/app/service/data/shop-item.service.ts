import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SHOPD_JPA_API_URL } from '../../app.constants';
import { ShopdItem } from '../../app.classes';

@Injectable({
  providedIn: 'root'
})
export class ShopItemService {

  private http = inject(HttpClient);

  retrieveItem(id: string): any {
    return this.http.get<ShopdItem>(`${SHOPD_JPA_API_URL}/items/${id}`);
  }

  retrieveAllItems(): any {
    return this.http.get<ShopdItem[]>(`${SHOPD_JPA_API_URL}/items`);
  }

  retrieveItemsByCategories(categories: string[]): any {
    const categoryParams = categories.map(cat => `categories=${encodeURIComponent(cat)}`).join('&');
    return this.http.get<ShopdItem[]>(`${SHOPD_JPA_API_URL}/items/search?${categoryParams}`);
  }

  getUserListings(userId: string): any {
    return this.http.get<ShopdItem[]>(`${SHOPD_JPA_API_URL}/items/get-all-items-from-user/${userId}`);
  }

  deleteItem(userId: string, itemId: string): any {
    return this.http.delete(`${SHOPD_JPA_API_URL}/items/${userId}/${itemId}`);
  }

}
