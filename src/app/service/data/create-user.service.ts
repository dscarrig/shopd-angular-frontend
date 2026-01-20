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
      .subscribe(
        () => {
        this.http.get<boolean>(`${API_URL}/users/exists/${username}`).subscribe(
          userExistsData => {
            this.userExists = userExistsData;
          }
        );

        this.http.post(`${API_URL}/register`, {username, password}).subscribe(
          result => {
            console.log(result);
            this.basicAuthenticationService.logout();

            if (!this.userExists) {
              console.log('Navigating to success page');
              this.router.navigate(['success']);
            } else {
              console.log('Navigating to createaccount/fail page');
              this.router.navigate(['createaccount', 'fail']);
            }
          },
          error => {
            console.log(error);
          }
        );
        },
        (error: any) => {
          console.log(error);
        }
    );
  }

}
