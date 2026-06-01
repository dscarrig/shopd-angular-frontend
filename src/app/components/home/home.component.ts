import { Component, OnInit, inject } from '@angular/core';
import { BasicAuthenticationService } from '../../service/app/basic-authentication.service';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: false
})
export class HomeComponent implements OnInit {
  title: string = 'Home';
  authenticationService: BasicAuthenticationService = inject(BasicAuthenticationService);
  private appComponent = inject(AppComponent);
  username: string | null = null;
  isLoggedIn: boolean = false;

  ngOnInit(): void {
    this.username = this.authenticationService.getAuthenticatedUser();
    this.isLoggedIn = this.authenticationService.isUserLoggedIn();
    this.appComponent.refreshMenu();
  }
}
