import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { FileService } from '../file.service';
import { PostService } from '../post.service';
import { UserService } from '../user.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileHelperService {

  constructor(private fileService: FileService, private postService: PostService, private userService: UserService) { }

  private updatePostPhotoId(userId: string, photoId: string): Observable<any> {
    return this.postService.updateBulkPosts({ userId: userId, photoId: photoId });
  }

  private updateUserPhotoId(userId: string, photoId: string): Observable<any> {
    return this.userService.updateUserPhoto({ id: userId, photoId: photoId });
  }

  private uploadProfilePhoto(event: any): Observable<any> {
    return new Observable(observer => {
      let targetEvent = event?.target
      if (targetEvent?.files?.length > 0) {
        const file = event.target.files[0];
        const formData = new FormData();
        formData.append('picture', file);
        this.fileService.uploadImage(formData).subscribe(uploadResult => {
          observer.next(uploadResult);
        });
      }
    });
  }

  changeActiveUserProfilePhoto(userId: string, event: Event): Observable<any> {
    return new Observable(observer => {
      this.uploadProfilePhoto(event).subscribe(uploadResult => {
        this.updateUserPhotoId(userId, uploadResult.uploadId).subscribe(() => {
          this.updatePostPhotoId(userId, uploadResult.uploadId).subscribe(() => {
            observer.next(uploadResult.uploadId);
          });
        });
      });
    });
  }

}
