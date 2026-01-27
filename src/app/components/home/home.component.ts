import { Component, OnInit, inject } from '@angular/core';
import { BasicAuthenticationService } from '../../service/app/basic-authentication.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
    standalone: false
})
export class HomeComponent implements OnInit {
  title = 'Home';
  authenticationService = inject(BasicAuthenticationService);
  username: string | null = null;

  ngOnInit(): void {
    this.username = this.authenticationService.getAuthenticatedUser();
  }
}
