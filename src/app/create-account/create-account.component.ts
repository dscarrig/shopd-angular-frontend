import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CreateUserService } from '../service/data/create-user.service';

@Component({
  selector: 'app-create-account',
  imports: [ReactiveFormsModule],
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private createUserService = inject(CreateUserService);
  private fb = inject(FormBuilder);

  createAccountForm!: FormGroup;
  fail = '';
  invalidLogin = false;
  userExists = false;

  ngOnInit(): void {
    console.log('CreateAccountComponent initialized');
    
    this.createAccountForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(6)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
    
    if (this.route.snapshot.params['id'] === 'fail') {
      this.userExists = true;
    }
  }

  createUser(): void {
    if (this.createAccountForm.valid) {
      console.log('Trying to create a user');
      const username = this.createAccountForm.get('username')?.value;
      const password = this.createAccountForm.get('password')?.value;
      console.log('Username:', username);

      this.createUserService.createUser(username, password);
    }
  }

}
