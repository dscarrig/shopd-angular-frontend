import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SHOPD_JPA_API_URL } from '../../app.constants';
import { ShopdItem } from '../../app.constants';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private http = inject(HttpClient);
  private cartItemCountSubject = new BehaviorSubject<number>(0);
  public cartItemCount$ = this.cartItemCountSubject.asObservable();

  refreshCartCount(userId: string): void {
    this.totalItemsInCart(userId).subscribe(
      (count: number) => this.cartItemCountSubject.next(count)
    );
  }

  addToCart(userId: string, itemId: string): any {
    console.log(`Adding item with ID ${itemId} to cart for user ID ${userId}`);
    return this.http.post(`${SHOPD_JPA_API_URL}/cart/add/${userId}`, itemId).pipe(
      tap(() => this.refreshCartCount(userId))
    );
  }

  copyTempCart(userId: string): any {
    return this.http.post(`${SHOPD_JPA_API_URL}/cart/copy/${userId}`, 'temp');
  }

  retrieveAllFromCart(userId: string): any {
    console.log(`Retrieving all items from cart for user ID ${userId}`);
    return this.http.get<ShopdItem[]>(`${SHOPD_JPA_API_URL}/cart/items/${userId}`);
  }

  deleteFromCart(userId: string, itemId: string): any {
    return this.http.delete(`${SHOPD_JPA_API_URL}/cart/remove/${userId}/${itemId}`).pipe(
      tap(() => this.refreshCartCount(userId))
    );
  }

  deleteAllFromCart(userId: string): any {
    return this.http.delete(`${SHOPD_JPA_API_URL}/cart/clear/${userId}`).pipe(
      tap(() => this.refreshCartCount(userId))
    );
  }

  totalPriceOfCart(userId: string): any {
    return this.http.get(`${SHOPD_JPA_API_URL}/cart/total/${userId}`);
  }

  totalItemsInCart(userId: string): any {
    return this.http.get(`${SHOPD_JPA_API_URL}/cart/item-count/${userId}`);
  }
}
