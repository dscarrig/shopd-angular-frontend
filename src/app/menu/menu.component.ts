import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BasicAuthenticationService } from '../service/app/basic-authentication.service';

@Component({
  selector: 'app-menu',
  imports: [CommonModule, RouterModule],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  private authenticationService = inject(BasicAuthenticationService);
  
  itemsInCart: number = 0;
  userName: string = 'Guest';

  ngOnInit(): void {
    this.updateUsername();
  }

  refreshMenu() {
    this.updateUsername();
    // Logic to refresh menu items, e.g., fetch cart items count or user info
  }

  isLoggedIn(): boolean {
    return this.authenticationService.isUserLoggedIn();
  }

  private updateUsername() {
    const authenticatedUser = this.authenticationService.getAuthenticatedUser();
    this.userName = authenticatedUser || 'Guest';
  }
}
