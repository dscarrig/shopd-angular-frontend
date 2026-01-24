import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TODO_JPA_API_URL } from '../../app.constants';
import { ShopItem } from '../../shop-item/shop-item.component';

@Injectable({
  providedIn: 'root'
})
export class ShopItemService {

  private http = inject(HttpClient);

  retrieveItem(id: number): any {
    return this.http.get<ShopItem>(`${TODO_JPA_API_URL}/items/${id}`);
  }

  retrieveAllItems(): any {
    return this.http.get<ShopItem[]>(`${TODO_JPA_API_URL}/items`);
  }
}
