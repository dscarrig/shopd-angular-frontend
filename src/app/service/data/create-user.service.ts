import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '../../app.constants';
import { Router } from '@angular/router';
import { BasicAuthenticationService } from '../app/basic-authentication.service';

@Injectable({
  providedIn: 'root'
})
export class CreateUserService {
  private http = inject(HttpClient);
  private basicAuthenticationService = inject(BasicAuthenticationService);
  private router = inject(Router);


  userExists = false;

  createUser(username: string, password: string): void {

    this.basicAuthenticationService.executeJWTAuthenticationService('temp', 'temp')
      .subscribe({
        next: () => {
          this.http.post(`${API_URL}/register`, {username, password}, { observe: 'response' }).subscribe({
            next: response => {
              console.log(response);
              this.basicAuthenticationService.logout();
              console.log('Navigating to success page');
              this.router.navigate(['success']);
              
            },
            error: error => {
              console.log(error);
              this.router.navigate(['createaccount', 'fail']);
            }
          });
        },
        error: (error: any) => {
          console.log(error);
          this.router.navigate(['createaccount', 'fail']);
        }
      });
  }

}
