import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    standalone: false
})
export class LoginComponent {
    private router = inject(Router);
    private appComponent = inject(AppComponent);
    
    username: string = '';
    password: string = '';
    invalidLogin = false;
    errorMessage: string = 'Invalid Credentials';

    login() {
        // Simulate login logic
        if (this.username === 'admin' && this.password === 'admin') {
            this.appComponent.isLoggedIn = true;
            this.router.navigate(['/home']);
        } else {
            this.invalidLogin = true;
        }
    }

    goToCreateAccount() {
        this.router.navigate(['/create-account']);
    }
}
