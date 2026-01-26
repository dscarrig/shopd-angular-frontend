import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SHOPD_JPA_API_URL } from '../../app.constants';
import { AccountDetailItem } from '../../my-account/my-account.component';

@Injectable({
  providedIn: 'root'
})
export class UserInfoService {
  private http = inject(HttpClient);

  addUserInfo(userId: string, userInfo: string): any {
    //console.log(`Adding info: ${userInfo}`);
    return this.http.put(`${SHOPD_JPA_API_URL}/users/${userId}/account-details/add`, userInfo);
  }

  getUserAccountDetails(userId: string): any {
    return this.http.get<AccountDetailItem>(`${SHOPD_JPA_API_URL}/users/${userId}/account-details/get-account-details`);
  }

  getAllUsersAccountDetails(userId: string): any {
    return this.http.get<AccountDetailItem[]>(`${SHOPD_JPA_API_URL}/users/${userId}/account-details/get-all-users-account-details`);
  }

  getUserAddress(userId: string): any {
    return this.http.get<string>(`${SHOPD_JPA_API_URL}/users/${userId}/account-details/get-address`);
  }

  getUserCity(userId: string): any {
    return this.http.get<string>(`${SHOPD_JPA_API_URL}/users/${userId}/account-details/get-city`);
  }

  getUserState(userId: string): any {
    return this.http.get<string>(`${SHOPD_JPA_API_URL}/users/${userId}/account-details/get-state`);
  }

  getUserZipCode(userId: string): any {
    return this.http.get<string>(`${SHOPD_JPA_API_URL}/users/${userId}/account-details/get-zip-code`);
  }

  getUserCardNumber(userId: string): any {
    return this.http.get<string>(`${SHOPD_JPA_API_URL}/users/${userId}/account-details/get-card-number`);
  }

  deleteUserDetail(userId: string, toDelete: string): any {
    return this.http.post(`${SHOPD_JPA_API_URL}/users/${userId}/account-details/delete-account-detail`, toDelete);
  }

  setDefaultDetail(userId: string, newDefault: string): any {
    return this.http.post(`${SHOPD_JPA_API_URL}/users/${userId}/account-details/set-new-default`, newDefault);
  }
}