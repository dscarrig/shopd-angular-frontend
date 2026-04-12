import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CreateUserService } from '../../service/data/create-user.service';

/**
 * Component for creating a new user account. It provides a form for users to enter their desired username and password, and handles the submission of this information to create a new account.
 * The component interacts with the CreateUserService to perform the account creation process, which includes authenticating with temporary credentials and sending a request to the backend API to register the new user.
 * It also handles navigation based on the success or failure of the account creation attempt, providing feedback to the user if the username already exists or if there was an error during the registration process.
 * The component ensures that the form is valid before allowing submission and provides appropriate validation messages for user input.
 */
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
      email: ['', [Validators.required, Validators.email]],
      username: ['', [Validators.required, Validators.minLength(6)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

    if (this.route.snapshot.params['id'] === 'fail') {
      this.userExists = true;
    }
  }

  createUser(): void {
    if (this.createAccountForm.valid) {
      const email = this.createAccountForm.get('email')?.value;
      const username = this.createAccountForm.get('username')?.value;
      const password = this.createAccountForm.get('password')?.value;

      this.createUserService.createUser(email, username, password);
    }
  }

}
