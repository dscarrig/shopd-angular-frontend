import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SHOPD_JPA_API_URL } from '../../app.constants';
import { Order, ShopdItem } from '../../app.classes';

@Injectable({
  providedIn: 'root'
})
export class PurchaseHistoryService {

  private http = inject(HttpClient);

  makePurchase(userId: string, itemId: string): any {
    return this.http.post(`${SHOPD_JPA_API_URL}/purchases/${userId}/${itemId}`, {});
  }

  getUserPurchaseHistory(userId: string): any {
    console.log(`Fetching purchase history for user: ${userId}`);
    return this.http.get<Order[]>(`${SHOPD_JPA_API_URL}/purchases/user/orders/${userId}`);
  }

  getItemPurchaseHistory(itemId: string): any {
    return this.http.get<ShopdItem[]>(`${SHOPD_JPA_API_URL}/purchases/item/${itemId}`);
  }
}
