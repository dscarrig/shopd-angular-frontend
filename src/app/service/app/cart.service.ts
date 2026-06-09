import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SHOPD_JPA_API_URL } from '../../app.constants';
import { ShopdItem } from '../../app.classes';
import { BehaviorSubject, Observable, switchMap, tap, throwError } from 'rxjs';

/**
 * Service for managing the shopping cart functionality, including adding items to the cart, retrieving cart contents, deleting items from the cart, and calculating totals.
 * It interacts with the backend API to perform these operations and maintains a BehaviorSubject to track the count of items in the cart, allowing components to reactively update their views when the cart changes.
 * The service provides methods for adding items to the cart, copying a temporary cart to a user's cart, retrieving all items in the cart, deleting specific items or clearing the entire cart, and calculating the total price and item count in the cart.
 */
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

  addToCart(userId: string, item: ShopdItem): Observable<any> {
    return this.retrieveAllFromCart(userId).pipe(
      switchMap((cartItems: ShopdItem[]) => {
        const currentCount = cartItems.filter(i => i.id === item.id).length;
        if (currentCount >= item.quantity) {
          return throwError(() => new Error(`Cannot add "${item.name}" — cart already has the maximum available quantity (${item.quantity}).`));
        }
        return this.http.post(`${SHOPD_JPA_API_URL}/cart/add/${userId}`, item.id).pipe(
          tap(() => this.refreshCartCount(userId))
        );
      })
    );
  }

  copyTempCart(userId: string, tempUserId: string): Observable<any> {
    return this.http.post(`${SHOPD_JPA_API_URL}/cart/copy/${userId}`, tempUserId, {
      headers: { 'Content-Type': 'application/json' },
      responseType: 'text' as 'json'
    }).pipe(
      tap(() => this.refreshCartCount(userId))
    );
  }

  retrieveAllFromCart(userId: string): any {
    return this.http.get<ShopdItem[]>(`${SHOPD_JPA_API_URL}/cart/items/${userId}`);
  }

  deleteFromCart(userId: string, itemId: string): any {
    return this.http.delete(`${SHOPD_JPA_API_URL}/cart/remove/${userId}/${itemId}`).pipe(
      tap(() => this.refreshCartCount(userId))
    );
  }

  deleteAllFromCart(userId: string): any {
    return this.http.delete(`${SHOPD_JPA_API_URL}/cart/clear/${userId}`).pipe(
      tap(() => {
        this.refreshCartCount(userId);
      })
    );
  }

  totalPriceOfCart(userId: string): any {
    return this.http.get(`${SHOPD_JPA_API_URL}/cart/total/${userId}`);
  }

  totalItemsInCart(userId: string): any {
    return this.http.get(`${SHOPD_JPA_API_URL}/cart/item-count/${userId}`);
  }
}
