import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BasicAuthenticationService } from '../app/basic-authentication.service';

@Injectable({
  providedIn: 'root'
})
export class HttpIntercepterBasicAuthService implements HttpInterceptor {
  private basicAuthenticationService = inject(BasicAuthenticationService);

  intercept(request: HttpRequest<any>, next: HttpHandler) {

    const basicAuthHeaderString: string | null = this.basicAuthenticationService.getAuthenticatedToken();
    const username: string | null = this.basicAuthenticationService.getAuthenticatedUser();

    if (basicAuthHeaderString && username) {
      request = request.clone({
        setHeaders: {
          Authorization: basicAuthHeaderString
        }
      });
    }

    return next.handle(request);
  }
}