import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from '../../app.constants';
import { OrderItem } from '../../app.classes';

/**
 * Interface representing an order, including properties such as id, username, date, status, total, and items.
 * This interface defines the structure of order data that is used throughout the OrderService to manage and manipulate order information.
 */
export interface Order {
  orderId: string;
  userId: string;
  items: OrderItem[];
  totalAmount: number;
  status: string;
  createdAt: string;
}

/**
 * Service for managing orders, including retrieving user orders, getting order details, creating new orders, and updating order status.
 * It interacts with the backend API to perform these operations and provides methods for components to access and manipulate order data.
 * The service defines an Order interface to represent the structure of order data, including properties such as orderId, userId, createdAt, status, totalAmount, and items.
 * It allows components to retrieve a user's orders, get details of a specific order, create new orders, and update the status of existing orders through HTTP requests to the backend API.
 */
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
    return this.http.post<Order>(`${this.apiUrl}/create`, order);
  }

  updateOrderStatus(id: number, status: string): Observable<Order> {
    return this.http.put<Order>(`${this.apiUrl}/${id}/status`, { status });
  }
}