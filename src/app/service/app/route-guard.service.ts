import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { BasicAuthenticationService } from './basic-authentication.service';

@Injectable({
  providedIn: 'root'
})
export class RouteGuardService {
  private authenticationService = inject(BasicAuthenticationService);
  private router = inject(Router);

  canActivate() {
    if (this.authenticationService.isUserLoggedIn()) {
      return true;
    }
    else {
      console.log('Blocked by route guard!');
      this.router.navigate(['login']);
    }


    return false;
  }

  notLogged() {
    if (!this.authenticationService.isUserLoggedIn()) {
      return true;
    }
    else {
      console.log('Blocked by route guard!');
    }


    return false;
  }
}
