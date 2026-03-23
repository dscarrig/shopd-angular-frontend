import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '../../app.constants';
import { Router } from '@angular/router';
import { BasicAuthenticationService } from '../app/basic-authentication.service';

/**
 * Service for creating new user accounts. It interacts with the backend API to register new users and handles the authentication process for temporary credentials to ensure that only authorized requests can create new accounts.
 * The service provides a method for creating a user by sending a POST request to the registration endpoint of the backend API. It first authenticates using temporary credentials, then attempts to create the new user account, and finally handles the response to navigate to success or failure pages based on the outcome of the registration process.
 * This service ensures that user creation is secure and that appropriate feedback is provided to the user based on the success or failure of their account creation attempt.
 */
@Injectable({
  providedIn: 'root'
})
export class CreateUserService {
  private http = inject(HttpClient);
  private basicAuthenticationService = inject(BasicAuthenticationService);
  private router: Router = inject(Router);

  userExists: boolean = false;

  createUser(username: string, password: string): void {

    this.basicAuthenticationService.executeJWTAuthenticationService('temp', 'temp')
      .subscribe({
        next: () => {
          this.http.post(`${API_URL}/register`, {username, userId: '0', password}, { observe: 'response' }).subscribe({
            next: response => {
              this.basicAuthenticationService.logout();
              this.router.navigate(['success']);
              
            },
            error: error => {
              console.error('Error during user creation', error);
              this.router.navigate(['createaccount', 'fail']);
            }
          });
        },
        error: (error: any) => {
          console.error('Authentication failed', error);
          this.router.navigate(['createaccount', 'fail']);
        }
      });
  }

}
