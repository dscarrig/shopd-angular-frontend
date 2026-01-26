import { API_URL } from '../../app.constants';
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { map, switchMap, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { SHOPD_JPA_API_URL } from '../../app.constants';

export const TOKEN = 'token';
export const AUTHENTICATED_USER = 'authenticatedUser';
export const USER_ID = 'userId';

@Injectable({
  providedIn: 'root'
})
export class BasicAuthenticationService {
  private http = inject(HttpClient);

  executeJWTAuthenticationService(username: string, password: string): any {

    return this.http.post<any>(
      `${API_URL}/authenticate`, {
        username,
        password
      }).pipe(
        tap(data => {
          console.log('User logged in successfully with username:', username);
          sessionStorage.setItem(AUTHENTICATED_USER, username);
          sessionStorage.setItem(TOKEN, `Bearer ${data.token}`);
        }),
        switchMap(data =>
          this.http.get<string>(`${SHOPD_JPA_API_URL}/users/user-id/${username}`, { responseType: 'text' as 'json' })
            .pipe(
              tap(userId => {
                sessionStorage.setItem(USER_ID, userId);
              }),
              map(() => data)
            )
        )
      );
  }

  loginAsGuest(): any {
    const username = 'Guest';
    const password = 'temp';

    return this.http.post<any>(
      `${API_URL}/authenticate`, {
        username,
        password
      }).pipe(
        tap(data => {
          console.log('Logged in as guest');
          sessionStorage.setItem(AUTHENTICATED_USER, username);
          sessionStorage.setItem(TOKEN, `Bearer ${data.token}`);
        }),
        switchMap(data => 
          this.http.get<string>(`${SHOPD_JPA_API_URL}/users/user-id/${username}`, { responseType: 'text' as 'json' })
            .pipe(
              tap(userId => {
                sessionStorage.setItem(USER_ID, userId);
              }),
              map(() => data)
            )
        )
      );
  }

  getAuthenticatedUser(): string | null {
    return sessionStorage.getItem(AUTHENTICATED_USER);
  }

  getAuthenticatedUserId(): string | null {
    return sessionStorage.getItem(USER_ID);
  }

  getAuthenticatedToken(): string | null {
    if (this.getAuthenticatedUser()) {
      return sessionStorage.getItem(TOKEN);
    }
    return null;
  }

  isUserLoggedIn(): boolean {
    const user = sessionStorage.getItem(AUTHENTICATED_USER);
    return !(user === null) && !(user === 'Guest');
  }

  logout(): void {
    sessionStorage.removeItem(AUTHENTICATED_USER);
    sessionStorage.removeItem(TOKEN);
    sessionStorage.removeItem(USER_ID);
    this.loginAsGuest();
  }

}

export class AuthenticationBean {
  constructor(public message: string) { }
}
