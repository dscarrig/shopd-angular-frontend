import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CreateUserService } from '../service/data/create-user.service';

@Component({
  selector: 'app-create-account',
  imports: [FormsModule],
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private createUserService = inject(CreateUserService);


  username = '';
  password = '';
  fail = '';
  invalidLogin = false;
  userExists = false;

  ngOnInit(): void {
    console.log('CreateAccountComponent initialized');
    if (this.route.snapshot.params['id'] === 'fail') {
      this.userExists = true;
    }
  }

  createUser(): void {
    console.log('Trying to create a user');
    console.log('Username:', this.username);

    this.createUserService.createUser(this.username, this.password);
  }

}
