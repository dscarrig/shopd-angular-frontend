import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TODO_JPA_API_URL } from '../../app.constants';
import { AccountDetailItem } from '../../my-account/my-account.component';

@Injectable({
  providedIn: 'root'
})
export class UserInfoService {
  private http = inject(HttpClient);

  addUserInfo(username: string, userInfo: string): any {
    console.log(`Adding info: ${userInfo}`);
    return this.http.post(`${TODO_JPA_API_URL}/users/${username}/account-details/add`, userInfo);
  }

  getUserAccountDetails(username: string): any {
    return this.http.get<AccountDetailItem>(`${TODO_JPA_API_URL}/users/${username}/account-details/get-account-details`);
  }

  getAllUsersAccountDetails(username: string): any {
    return this.http.get<AccountDetailItem[]>(`${TODO_JPA_API_URL}/users/${username}/account-details/get-all-users-account-details`);
  }

  getUserAddress(username: string): any {
    return this.http.get<string>(`${TODO_JPA_API_URL}/users/${username}/account-details/get-address`);
  }

  getUserCity(username: string): any {
    return this.http.get<string>(`${TODO_JPA_API_URL}/users/${username}/account-details/get-city`);
  }

  getUserState(username: string): any {
    return this.http.get<string>(`${TODO_JPA_API_URL}/users/${username}/account-details/get-state`);
  }

  getUserZipCode(username: string): any {
    return this.http.get<string>(`${TODO_JPA_API_URL}/users/${username}/account-details/get-zip-code`);
  }

  getUserCardNumber(username: string): any {
    return this.http.get<string>(`${TODO_JPA_API_URL}/users/${username}/account-details/get-card-number`);
  }

  deleteUserDetail(username: string, toDelete: string): any {
    return this.http.post(`${TODO_JPA_API_URL}/users/${username}/account-details/delete-account-detail`, toDelete);
  }

  setDefaultDetail(username: string, newDefault: string): any {
    return this.http.post(`${TODO_JPA_API_URL}/users/${username}/account-details/set-new-default`, newDefault);
  }
}