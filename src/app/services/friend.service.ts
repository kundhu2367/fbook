import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';

import { IFriend } from '../interface/friend.model';

import { HeaderService } from './header.service';

@Injectable({
  providedIn: 'root'
})
export class FriendService {

    apiBaseURL = environment.apiUrl;

    constructor(private http: HttpClient, private header: HeaderService) { }

    createRequest(newRequest: IFriend) {
        return this.http.post<IFriend>(`${this.apiBaseURL}friends/createrequest`, newRequest, this.header.requestHeaders()).pipe(map(res => {
            return res;
        }));
    }

    getAllFriendRequests() {
        return this.http.get<any[]>(`${this.apiBaseURL}friends/`).pipe(res => {
            return res;
        });
    }

    getFriendById(id: String) {
        return this.http.get<IFriend>(`${this.apiBaseURL}friends/${id}`).pipe(map(res => {
            return res;
        }));
    };

    updateFriendRequest(updatedRequest : IFriend) {
        return this.http.put(`${this.apiBaseURL}friends/${updatedRequest.id}`, updatedRequest, this.header.requestHeaders()).pipe(res => {
            return res;
        });
    };

}
