import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SHOPD_JPA_API_URL } from '../../app.constants';
import { ShopdItem } from '../../app.constants';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private http = inject(HttpClient);

  addToCart(userId: string, itemId: string): any {
    console.log(`Adding item with ID ${itemId} to cart for user ID ${userId}`);
    return this.http.post(`${SHOPD_JPA_API_URL}/cart/add/${userId}`, itemId);
  }

  copyTempCart(userId: string): any {
    return this.http.post(`${SHOPD_JPA_API_URL}/cart/copy/${userId}`, 'temp');
  }

  retrieveAllFromCart(userId: string): any {
    console.log(`Retrieving all items from cart for user ID ${userId}`);
    return this.http.get<ShopdItem[]>(`${SHOPD_JPA_API_URL}/cart/items/${userId}`);
  }

  deleteFromCart(userId: string, itemId: string): any {
    return this.http.delete(`${SHOPD_JPA_API_URL}/cart/remove/${userId}/${itemId}`);
  }

  deleteAllFromCart(userId: string): any {
    return this.http.delete(`${SHOPD_JPA_API_URL}/cart/clear/${userId}`);
  }

  totalPriceOfCart(userId: string): any {
    return this.http.get(`${SHOPD_JPA_API_URL}/cart/total/${userId}`);
  }

  totalItemsInCart(userId: string): any {
    return this.http.get(`${SHOPD_JPA_API_URL}/cart/item-count/${userId}`);
  }
}
