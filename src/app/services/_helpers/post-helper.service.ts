import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';
import { mergeMap, first } from 'rxjs/operators';

import { IPost } from '../../interface/post.model';

import { DateUtility } from '../../utilities/date-utility';
import { ImageUtility } from '../../utilities/image-utility';

import { FileService } from '../file.service';
import { PostService } from '../post.service';

@Injectable({
  providedIn: 'root'
})
export class PostHelperService {

  postUpdate = new BehaviorSubject(false);

  constructor( private postService: PostService, private fileService: FileService) { }

  private calculatePostTimers(filteredPosts: any): IPost[] {
    filteredPosts.forEach((post: IPost) => {
      post.postTimer = DateUtility(post.createdDate || "");
    });

    return filteredPosts.reverse();
  }

  private loadUserIconForPosts(filteredPosts: IPost[], userId: String): Observable<any> {
    return new Observable(observer => {
      filteredPosts.forEach((post: any) => {
        post.isMyPost = post.userId === userId ? true : false;
        if (post.userPhotoId && post.userPhotoId !== "" && post.userPhotoId !== " ") {
          this.fileService.getPhotoById(post.userPhotoId).subscribe(res => {
              ImageUtility(res).subscribe(response => {
                post.userIcon = response;
                observer.next(filteredPosts);
              })
            });
        } else {
          observer.next(filteredPosts);
        }
      });
    });
  }

  private loadPostImages(mappedPosts: any): Observable<any> {
    return new Observable(observer => {
      mappedPosts.forEach((post: any) => {
        if ( post.postImageId && post.postImageId !== "" && post.postImageId !== " " ) {
          this.fileService.getPhotoById(post.postImageId).subscribe(res => {
            post.isPostImage = true;
            ImageUtility(res).subscribe(response => {
              post.postImage = response;
              observer.next(mappedPosts);
            });
          });
        } else {
          post.isPostImage = false;
          observer.next(mappedPosts);
        }
      });
    });
  }

  loadPosts(userId: string): Observable<any> {
    return new Observable(observer => {

      this.postService.getAllPosts().pipe(
        mergeMap((posts: IPost[]) => {
          if (posts.length === 0) {
            observer.next(posts);
          }

          let activePosts = posts.filter( (post: any) => { return post.isActive === true; });
          let aggregatePosts = this.calculatePostTimers(activePosts);

          return this.loadUserIconForPosts(aggregatePosts, userId)
            .pipe(
              first(),
              mergeMap((mappedPosts: IPost[]) => {
                return this.loadPostImages(mappedPosts)
              })
            )
        })
      ).subscribe((finalPosts: any) => {
        observer.next(finalPosts);
      });

    });
  }

}
