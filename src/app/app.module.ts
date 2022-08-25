import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AlertComponent } from './components/alert/alert.component';
import { ErrorComponent } from './components/error/error.component';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { FriendComponent } from './components/friend/friend.component';
import { FriendListComponent } from './components/friend-list/friend-list.component';
import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './components/login/login.component';
import { LoaderComponent } from './components/loader/loader.component';
import { NetworkComponent } from './components/network/network.component';
import { ProfileComponent } from './components/profile/profile.component';
import { PostComponent } from './components/post/post.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { SettingsComponent } from './components/settings/settings.component';
import { UsersListComponent } from './components/users-list/users-list.component';

import { ErrorsPageComponent } from './pages/errors-page/errors-page.component';
import { ForgetPasswordPageComponent } from './pages/forget-password-page/forget-password-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { SettingsPageComponent } from './pages/settings-page/settings-page.component';

import { AuthInterceptor } from './services/interceptors/auth.interceptor';
import { ErrorInterceptor } from './services/interceptors/error.interceptor';
import { LoaderInterceptor } from './services/interceptors/loader.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    AlertComponent,
    ErrorComponent,
    ErrorsPageComponent,
    ForgetPasswordComponent,
    ForgetPasswordPageComponent,
    FriendComponent,
    FriendListComponent,
    HeaderComponent,
    HomePageComponent,
    LoaderComponent,
    LoginComponent,
    LoginPageComponent,
    NetworkComponent,
    PostComponent,
    ProfileComponent,
    RegistrationComponent,
    RegisterPageComponent,
    ResetPasswordComponent,
    SettingsComponent,
    SettingsPageComponent,
    UsersListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
