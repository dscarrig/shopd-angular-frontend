import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SHOPD_JPA_API_URL } from '../../app.constants';
import { AccountDetailItem } from '../../components/my-account/my-account.component';

@Injectable({
  providedIn: 'root'
})
export class UserInfoService {
  private http = inject(HttpClient);

  addUserInfo(userId: string, userInfo: string): any {
    //console.log(`Adding info: ${userInfo}`);
    return this.http.put(`${SHOPD_JPA_API_URL}/users/update-address/${userId}`, userInfo);
  }

  getUserAccountDetails(userId: string): any {
    return this.http.get<AccountDetailItem>(`${SHOPD_JPA_API_URL}/users/account-details/${userId}`);
  }

  getAllUsersAccountDetails(userId: string): any {
    return this.http.get<AccountDetailItem[]>(`${SHOPD_JPA_API_URL}/users/get-all-users-account-details/${userId}`);
  }

  getUserAddress(userId: string): any {
    return this.http.get<string>(`${SHOPD_JPA_API_URL}/users/get-address/${userId}`);
  }

  getUserCardNumber(userId: string): any {
    return this.http.get<string>(`${SHOPD_JPA_API_URL}/users/get-card-number/${userId}`);
  }

  deleteUserDetail(userId: string, toDelete: string): any {
    return this.http.post(`${SHOPD_JPA_API_URL}/users/delete-account-detail/${userId}`, toDelete);
  }

  setDefaultDetail(userId: string, newDefault: string): any {
    return this.http.post(`${SHOPD_JPA_API_URL}/users/set-new-default/${userId}`, newDefault);
  }
}