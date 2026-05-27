import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SHOPD_JPA_API_URL } from '../../app.constants';
import { Message } from '../../app.classes';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private http = inject(HttpClient);

  sendMessage(message: Message, sender_id: string, recipient_id: string): Observable<any> {
    return this.http.post(`${SHOPD_JPA_API_URL}/messages/send/${sender_id}/${recipient_id}`, message);
  }

  getMessages(userId: string): Observable<any> {
    return this.http.get(`${SHOPD_JPA_API_URL}/messages/receive/${userId}`);
  }

  markMessageAsRead(messageId: string): Observable<any> {
    return this.http.put(`${SHOPD_JPA_API_URL}/messages/mark-as-read/${messageId}`, {});
  }

  editMessage(messageId: string, newContent: string): Observable<any> {
    return this.http.put(`${SHOPD_JPA_API_URL}/messages/edit/${messageId}`, { content: newContent });
  }

  deleteMessage(messageId: string): Observable<any> {
    return this.http.delete(`${SHOPD_JPA_API_URL}/messages/delete/${messageId}`);
  }

  getMessageById(messageId: string): Observable<Message> {
    return this.http.get<Message>(`${SHOPD_JPA_API_URL}/messages/by-id/${messageId}`);
  }
}
