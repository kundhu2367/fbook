import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

import jwt_decode from 'jwt-decode';

import { environment } from 'src/environments/environment';

import { IUser } from '../interface/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private currentUserSubject: BehaviorSubject<any>;

  isUserAuthenticated = new BehaviorSubject<boolean>(this.hasToken());
  isUserAdmin = new BehaviorSubject<boolean>(this.hasAdmin());
  apiBaseURL = environment.apiUrl;

  constructor(private http: HttpClient, private router: Router) {
    this.currentUserSubject = new BehaviorSubject<IUser>(JSON.parse(localStorage.getItem('currentUser') || '{}'));
  }

  public get currentUserValue(): IUser {
      return this.currentUserSubject?.value;
  }

  private hasToken(): boolean {
      return !!localStorage.getItem('currentUser');
  }

  private hasAdmin(): boolean {
      if (localStorage.getItem('currentUser')) {
          return JSON.parse(localStorage.getItem('currentUser') || '{}').isAdmin ? true : false;
      }
      return false;
  }

  getToken() {
      if (localStorage.getItem('currentUser')) {
          return JSON.parse(localStorage.getItem('currentUser') || '{}').token;
      }
      return null;
  }

  getDecodedToken(token: string): any {
      try {
          return jwt_decode(token);
      }
      catch (Error) {
          return null;
      }
  }

  getTokenExpirationDate(token: string): Date {
      const decodedToken = this.getDecodedToken(token);
      const date = new Date(0);
      date.setUTCSeconds(decodedToken.exp);
      return date;
  }

  isTokenExpired(): boolean {
      var token = this.getToken();
      if (!token) return true;

      const date = this.getTokenExpirationDate(token);
      if (date === undefined) return false;
      return !(date.valueOf() > new Date().valueOf());
  }

  login(email: string, password: string) {
      return this.http.post<any>(this.apiBaseURL + 'users/authenticate', { email: email, password: password })
          .pipe(map(user => {
            if (user && user.token) {

                  localStorage.setItem('currentUser', JSON.stringify(user));
                  localStorage.setItem('currentUserPhotoId', user.photoId);
                  this.currentUserSubject.next(user);
                  this.isUserAuthenticated.next(true);
                  this.isUserAdmin.next(user.isAdmin);
              }

              return user;
          }));
  }

  logout() {

      localStorage.removeItem('currentUser');
      localStorage.removeItem('currentUserPhotoId');
      this.currentUserSubject.next(null);
      this.isUserAuthenticated.next(false);
      this.isUserAdmin.next(false);
      this.router.navigate(['/login']);
  }

}
