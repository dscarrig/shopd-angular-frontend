import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { MenuComponent } from './menu/menu.component';
import { HttpIntercepterBasicAuthService } from './service/http/http-intercepter-basic-auth.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    UserDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MenuComponent
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpIntercepterBasicAuthService, multi: true },
        provideHttpClient(withInterceptorsFromDi())
  ],
  bootstrap: [AppComponent], 
  })

export class AppModule { }
