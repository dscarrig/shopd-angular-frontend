import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from '../../app.constants';
import { ShopdItem } from '../../app.classes';

export interface Order {
  id: number;
  username: string;
  date: string;
  status: string;
  total: number;
  items: ShopdItem[];
}

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private http = inject(HttpClient);
  private apiUrl = `${API_URL}/api/orders`;

  getUserOrders(username: string): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.apiUrl}/user/${username}`);
  }

  getOrder(id: number): Observable<Order> {
    return this.http.get<Order>(`${this.apiUrl}/${id}`);
  }

  createOrder(order: Order): Observable<Order> {
    return this.http.post<Order>(this.apiUrl, order);
  }

  updateOrderStatus(id: number, status: string): Observable<Order> {
    return this.http.put<Order>(`${this.apiUrl}/${id}/status`, { status });
  }
}