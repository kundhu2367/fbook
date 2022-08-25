import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';

import { IPost } from '../interface/post.model';

import { HeaderService } from './header.service';

@Injectable({
  providedIn: 'root'
})
export class PostService {

    apiBaseURL = environment.apiUrl;

    constructor(private http: HttpClient, private header: HeaderService) { }

    createPost(newPost: IPost) {
        return this.http.post<IPost>(`${this.apiBaseURL}posts/createpost`, newPost, this.header.requestHeaders()).pipe(res => {
            return res;
        });
    }

    getAllPosts() {
        return this.http.get<IPost[]>(`${this.apiBaseURL}posts/`);
    }

    getPostById(postId: String): any {
        return this.http.get(`${this.apiBaseURL}posts/` + postId).pipe(res => {
            return res;
        });
    };

    getPostByUserId(userId: String): any {
        return this.http.post(`${this.apiBaseURL}posts/findpostbyuserid`, { id: userId }, this.header.requestHeaders()).pipe(res => {
            return res;
        });
    };

    updateBulkPosts(updatePayload :  any) {
        return this.http.post<IPost>(`${this.apiBaseURL}posts/updatemanyposts`, updatePayload, this.header.requestHeaders()).pipe(res => {
            return res;
        });
    }

    updatePost(updatedPost: IPost) {
        return this.http.put<IPost>(`${this.apiBaseURL}posts/${updatedPost.id}`, updatedPost, this.header.requestHeaders()).pipe(res => {
            return res;
        });
    };

}
