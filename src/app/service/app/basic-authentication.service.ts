import { API_URL } from '../../app.constants';
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { map, switchMap, tap } from 'rxjs/operators';
import { SHOPD_JPA_API_URL } from '../../app.constants';
import { BehaviorSubject } from 'rxjs';
export const TOKEN = 'token';
export const AUTHENTICATED_USER = 'authenticatedUser';
export const USER_ID = 'userId';

/**
 * Service for handling basic authentication, including login, logout, and session management.
 * It interacts with the backend API to authenticate users and manage their session data in the browser's session storage.
 * The service provides methods for executing JWT authentication, logging in as a guest, retrieving authenticated user information, and checking login status.
 * It also ensures that user credentials and tokens are securely stored and managed during the user's session.
 */
@Injectable({
  providedIn: 'root'
})
export class BasicAuthenticationService {
  private http = inject(HttpClient);
  private authenticationChanged = new BehaviorSubject<string>(
    sessionStorage.getItem(AUTHENTICATED_USER) || 'guest'
  );
  public authenticationChanged$ = this.authenticationChanged.asObservable();

  executeJWTAuthenticationService(username: string, password: string): any {

    return this.http.post<any>(
      `${API_URL}/authenticate`, {
      username,
      password
    }).pipe(
      tap(data => {
        sessionStorage.setItem(AUTHENTICATED_USER, username);
        sessionStorage.setItem(TOKEN, `Bearer ${data.token}`);
      }),
      switchMap(data =>
        this.http.get<string>(`${SHOPD_JPA_API_URL}/users/user-id/${username}`, { responseType: 'text' as 'json' })
          .pipe(
            tap(userId => {
              sessionStorage.setItem(USER_ID, userId);
              this.authenticationChanged.next(username);
            }),
            map(() => data)
          )
      )
    );
  }

  loginAsGuest(): any {
    const username: string = 'guest';
    const password: string = 'temp';

    return this.http.post<any>(
      `${API_URL}/authenticate`, {
      username,
      password
    }).pipe(
      tap(data => {
        sessionStorage.setItem(AUTHENTICATED_USER, username);
        sessionStorage.setItem(TOKEN, `Bearer ${data.token}`);
      }),
      switchMap(data =>
        this.http.get<string>(`${SHOPD_JPA_API_URL}/users/user-id/${username}`, { responseType: 'text' as 'json' })
          .pipe(
            tap(userId => {
              sessionStorage.setItem(USER_ID, userId);
              this.authenticationChanged.next(username);
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
    const userId: string | null = sessionStorage.getItem(USER_ID);
    return userId ? userId.replace(/"/g, '') : null;
  }

  getAuthenticatedUserCardNum(): string | null {
    return sessionStorage.getItem('authenticatedUserCardNum');
  }

  getAuthenticatedToken(): string | null {
    if (this.getAuthenticatedUser()) {
      return sessionStorage.getItem(TOKEN);
    }
    return null;
  }

  isUserLoggedIn(): boolean {
    const user: string | null = sessionStorage.getItem(AUTHENTICATED_USER);
    return !(user === null) && !(user === 'guest');
  }

  logout(): void {
    sessionStorage.removeItem(AUTHENTICATED_USER);
    sessionStorage.removeItem(TOKEN);
    sessionStorage.removeItem(USER_ID);
    this.loginAsGuest();
    this.authenticationChanged.next('guest');
  }

}

export class AuthenticationBean {
  constructor(public message: string) { }
}
