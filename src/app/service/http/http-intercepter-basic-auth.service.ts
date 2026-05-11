import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BasicAuthenticationService } from '../app/basic-authentication.service';
import { API_URL } from '../../app.constants';

@Injectable({
  providedIn: 'root'
})
export class HttpIntercepterBasicAuthService implements HttpInterceptor {
  private basicAuthenticationService = inject(BasicAuthenticationService);

  intercept(request: HttpRequest<any>, next: HttpHandler) {

    const basicAuthHeaderString: string | null = this.basicAuthenticationService.getAuthenticatedToken();
    const username: string | null = this.basicAuthenticationService.getAuthenticatedUser();

    let headers: Record<string, string> = {};

    if (request.url.startsWith(API_URL)) {
      headers['ngrok-skip-browser-warning'] = 'true';
    }

    if (basicAuthHeaderString && username) {
      headers['Authorization'] = basicAuthHeaderString;
    }

    if (Object.keys(headers).length > 0) {
      request = request.clone({ setHeaders: headers });
    }

    return next.handle(request);
  }
}