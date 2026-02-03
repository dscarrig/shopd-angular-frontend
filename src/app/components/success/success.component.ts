import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from '../../app.component';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.css']
})
export class SuccessComponent {
  private router = inject(Router);
  private appComponent = inject(AppComponent);

  ngOnInit(): void {
    this.appComponent.refreshMenu();
  }

  goToLogin() {
    this.router.navigate(['login']);
  }
}
