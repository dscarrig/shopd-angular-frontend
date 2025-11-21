import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TODO_JPA_API_URL } from '../../app.constants';
import { ShopItem } from '../../shop-item/shop-item.component';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private http = inject(HttpClient);

  addToCart(username: string, id: number): any {
    return this.http.post(`${TODO_JPA_API_URL}/users/${username}/cart/add`, id);
  }

  copyTempCart(username: string): any {
    return this.http.post(`${TODO_JPA_API_URL}/users/${username}/cart/copy-cart`, 'temp');
  }

  retrieveAllFromCart(username: string): any {
    return this.http.get<ShopItem[]>(`${TODO_JPA_API_URL}/users/${username}/cart`);
  }

  deleteFromCart(username: string, id: number): any {
    return this.http.delete(`${TODO_JPA_API_URL}/users/${username}/cart/delete/${id}`);
  }

  deleteAllFromCart(username: string): any {
    return this.http.delete(`${TODO_JPA_API_URL}/users/${username}/cart/delete-all`);
  }

  totalPriceOfCart(username: string): any {
    return this.http.get(`${TODO_JPA_API_URL}/users/${username}/cart/totalPrice`);
  }

  totalItemsInCart(username: string): any {
    return this.http.get(`${TODO_JPA_API_URL}/users/${username}/cart/totalItems`);
  }
}
