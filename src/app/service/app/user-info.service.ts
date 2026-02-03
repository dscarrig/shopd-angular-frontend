import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SHOPD_JPA_API_URL } from '../../app.constants';
import { AccountDetailItem } from '../../app.classes';
import { Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserInfoService {
  private http = inject(HttpClient);
  private cachedAccountDetail: AccountDetailItem | null = null;
  private cachedUserId: string | null = null;

  getDefaultAccountDetail(userId: string): Observable<AccountDetailItem> {
    if (this.cachedAccountDetail && this.cachedUserId === userId) {
      return of(this.cachedAccountDetail);
    }

    return this.http.get<AccountDetailItem>(`${SHOPD_JPA_API_URL}/users/get-default-address/${userId}`).pipe(
      tap((accountDetail) => {
        this.cachedAccountDetail = accountDetail;
        this.cachedUserId = userId;
      })
    );
  }

  clearCache(): void {
    this.cachedAccountDetail = null;
    this.cachedUserId = null;
  }

  addUserInfo(userId: string, userInfo: AccountDetailItem): any {
    this.clearCache(); // Clear cache when adding new info
    return this.http.post(`${SHOPD_JPA_API_URL}/users/create-new-address/${userId}`, userInfo);
  }

  getAllUsersAccountDetails(userId: string): any {
    return this.http.get<AccountDetailItem[]>(`${SHOPD_JPA_API_URL}/users/get-all-users-account-details/${userId}`);
  }

  getUserAddress(userId: string): any {
    return this.http.get<string>(`${SHOPD_JPA_API_URL}/users/get-default-address/${userId}`);
  }

  getUserCardNumber(userId: string): any {
    return this.http.get<string>(`${SHOPD_JPA_API_URL}/users/get-card-number/${userId}`);
  }

  deleteUserDetail(userId: string, toDelete: string): any {
    this.clearCache(); // Clear cache when deleting
    return this.http.post(`${SHOPD_JPA_API_URL}/users/delete-account-detail/${userId}`, toDelete);
  }

  setDefaultDetail(userId: string, newDefault: string): any {
    this.clearCache(); // Clear cache when changing default
    return this.http.post(`${SHOPD_JPA_API_URL}/users/set-new-default/${userId}`, newDefault);
  }
}