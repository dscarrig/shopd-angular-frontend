import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    standalone: false
})
export class AppComponent {
  title = 'angular-frontend';
  isLoggedIn: boolean = false;
  public refresh = false;

  refreshMenu() {
    this.refresh = true;
  }

  finishRefresh() {
    this.refresh = false;
  }

  getRefreshStatus() {
    return this.refresh;
  }
}
