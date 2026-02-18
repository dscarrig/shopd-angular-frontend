import { Component, OnInit, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BasicAuthenticationService } from '../../service/app/basic-authentication.service';

@Component({
  selector: 'app-logout',
  imports: [RouterModule],
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {
  private basicAuthenticationService = inject(BasicAuthenticationService);

  ngOnInit(): void {
    this.basicAuthenticationService.logout();
  }

}
