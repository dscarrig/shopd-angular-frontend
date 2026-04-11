import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL, SHOPD_JPA_API_URL } from '../../app.constants';
import { Order, OrderItem, ShopdItem } from '../../app.classes';

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

  makePurchase(userId: string, itemId: string): any {
    return this.http.post(`${SHOPD_JPA_API_URL}/orders/buy/${userId}/${itemId}`, {});
  }

  getUserPurchaseHistory(userId: string): any {
    return this.http.get<Order[]>(`${SHOPD_JPA_API_URL}/orders/user/${userId}`);
  }

  getItemPurchaseHistory(itemId: string): any {
    return this.http.get<ShopdItem[]>(`${SHOPD_JPA_API_URL}/orders/item/${itemId}`);
  }

  getUserOrders(userId: string): Observable<Order[]> {
    return this.http.get<Order[]>(`${SHOPD_JPA_API_URL}/orders/user/${userId}`);
  }

  getOrder(id: string): Observable<Order> {
    return this.http.get<Order>(`${SHOPD_JPA_API_URL}/orders/${id}`);
  }

  createOrder(order: Order): Observable<Order> {
    console.log(`Creating order: ${JSON.stringify(order)}`);
    return this.http.post<Order>(`${SHOPD_JPA_API_URL}/orders/create`, order);
  }

  updateOrderStatus(id: string, status: string): Observable<Order> {
    console.log(`Updating order status for orderId: ${id} to status: ${status}`);
    return this.http.put<Order>(`${SHOPD_JPA_API_URL}/orders/status/${id}`, { status });
  }

  updateOrderItemStatus(id: string, status: string): Observable<OrderItem> {
    console.log(`Updating order item status for orderItemId: ${id} to status: ${status}`);
    return this.http.put<OrderItem>(`${SHOPD_JPA_API_URL}/orders/item/status/${id}`, { status });
  }

  getUsersListedOrders(userId: string): Observable<OrderItem[]> {
    return this.http.get<OrderItem[]>(`${SHOPD_JPA_API_URL}/orders/user/order-listings/${userId}`);
  }

  getShopItemByOrderItemId(orderItemId: string): Observable<ShopdItem> {
    return this.http.get<ShopdItem>(`${SHOPD_JPA_API_URL}/orders/user/shop-item/${orderItemId}`);
  }

  getUserIdByOrderItemId(orderItemId: string): Observable<string> {
    return this.http.get<string>(`${SHOPD_JPA_API_URL}/orders/user-id/${orderItemId}`);
  }
}