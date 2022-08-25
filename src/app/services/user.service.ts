import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

import { IUser } from '../interface/user.model';

import { HeaderService } from './header.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

    apiBaseURL = environment.apiUrl;

    constructor(private http: HttpClient, private header: HeaderService,) { }

    register(newUser: IUser): any {
        return this.http.post<IUser>(`${this.apiBaseURL}users/register`, newUser, this.header.requestHeaders()).pipe(res => {
            return res;
        });
    }

    getUsers(): Observable<IUser[]> {
        return this.http.get<IUser[]>(`${this.apiBaseURL}users/`).pipe(res => {
            return res;
        });
    }

    getUserById(userId: String): any {
        return this.http.get(`${this.apiBaseURL}users/${userId}`).pipe(res => {
            return res;
        });
    };

    getUserByEmail(email: String): any {
        return this.http.post(`${this.apiBaseURL}users/finduserbyemail`, { email: email }, this.header.requestHeaders()).pipe(res => {
            return res;
        });
    };

    updateUserPhoto(updatedUser : any) {
        return this.http.post(`${this.apiBaseURL}users/updateuserphotoId`, updatedUser, this.header.requestHeaders()).pipe(res => {
            return res;
        });
    };

    updateUser(updatedUser: any) {
        return this.http.put(`${this.apiBaseURL}users/${updatedUser.id}`, updatedUser, this.header.requestHeaders()).pipe(res => {
            return res;
        });
    };

}
