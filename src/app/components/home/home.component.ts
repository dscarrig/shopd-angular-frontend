import { Component, OnInit, inject } from '@angular/core';
import { BasicAuthenticationService } from '../../service/app/basic-authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: false
})
export class HomeComponent implements OnInit {
  title: string = 'Home';
  authenticationService: BasicAuthenticationService = inject(BasicAuthenticationService);
  username: string | null = null;
  isLoggedIn: boolean = false;

  ngOnInit(): void {
    this.username = this.authenticationService.getAuthenticatedUser();
    this.isLoggedIn = this.authenticationService.isUserLoggedIn();
  }
}
