import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FileService {

    apiBaseURL = environment.apiUrl;

    constructor(private http: HttpClient) { }

    uploadImage(formData: FormData) {
        return this.http.post<any>(this.apiBaseURL + 'files/uploadfile', formData).pipe(res => {
            return res;
        });
    }

    getPhotoById(photoId: String) {
        return this.http.get(this.apiBaseURL + 'files/' + photoId, { responseType: "blob" }).pipe(res => {
            return res;
        });
    }

}
