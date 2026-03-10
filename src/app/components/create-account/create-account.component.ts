import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CreateUserService } from '../../service/data/create-user.service';

@Component({
  selector: 'app-create-account',
  imports: [ReactiveFormsModule],
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {
  private route: ActivatedRoute = inject(ActivatedRoute);
  private createUserService: CreateUserService = inject(CreateUserService);
  private fb: FormBuilder = inject(FormBuilder);

  createAccountForm!: FormGroup;
  fail: string = '';
  invalidLogin: boolean = false;
  userExists: boolean = false;

  ngOnInit(): void {
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
      const username = this.createAccountForm.get('username')?.value;
      const password = this.createAccountForm.get('password')?.value;

      this.createUserService.createUser(username, password);
    }
  }

}
