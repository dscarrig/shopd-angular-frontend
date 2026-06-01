import { Component, OnInit, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BasicAuthenticationService } from '../../service/app/basic-authentication.service';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-logout',
  imports: [RouterModule],
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {
  private basicAuthenticationService = inject(BasicAuthenticationService);
  private appComponent = inject(AppComponent);

  ngOnInit(): void {
    this.basicAuthenticationService.logout();
    this.appComponent.refreshMenu();
  }

}
