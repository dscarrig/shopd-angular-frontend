import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-menu',
  imports: [CommonModule, RouterModule],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  itemsInCart: number = 0;
  userName: string = 'Guest';

  refreshMenu() {
    // Logic to refresh menu items, e.g., fetch cart items count or user info
  }
}
