import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { IFriend } from '../../interface/friend.model';
import { IUser } from '../../interface/user.model';

import { ImageUtility } from '../../utilities/image-utility';

import { FileService } from '../file.service';
import { FriendService } from '../friend.service';
import { UserService } from '../user.service';

@Injectable({
  providedIn: 'root'
})
export class UserHelperService {

  constructor(private fileService: FileService, private friendService: FriendService, private userService: UserService) { }

  private loadFriendsIcons(friends: any[]): Observable<any> {
    return new Observable(observer => {
      friends.forEach(oneFriend => {
        this.fileService.getPhotoById(oneFriend.photoId).subscribe(res => {
          ImageUtility(res).subscribe(response => {
            oneFriend.friendIcon = response;
            observer.next(friends);
          })
        });
      });
    });
  }

  private getActiveFriends(usersArray: IUser[], friendRequestArray: IFriend[]): Observable<any> {
    let finalFriendRequestList: IUser[] = [];
    return new Observable(observer => {

      usersArray.forEach(user => {
        if (friendRequestArray.length === 0) {
          user.isNewUser = true;
          finalFriendRequestList.push(user);
          return;
        }

        let elementMatch = friendRequestArray.find( (friendReq: IFriend) => {
          return friendReq.userId === user.id || friendReq.friendId === user.id;
        });

        if (elementMatch && elementMatch.friendId === user.id && elementMatch.status === 'Request Pending') {
          user.status = elementMatch.status;
          user.isRequested = true;
          finalFriendRequestList.push(user);
        }

        if (elementMatch && (elementMatch.friendId === user.id || elementMatch.userId === user.id) && elementMatch.status === 'Request Rejected') {
          user.status = elementMatch.status;
          user.isRejected = true;
          finalFriendRequestList.push(user);
        }

        if (!elementMatch) {
          user.isNewUser = true;
          finalFriendRequestList.push(user);
        }
      });

      observer.next(finalFriendRequestList);

    })
  }

  private loadFriendRequestDetails(filteredFriendRequests: any[]): Observable<any> {
    return new Observable(observer => {
      filteredFriendRequests.forEach(friendRequest => {
        this.userService.getUserById(friendRequest.uniqueId).subscribe((friendDetails: any) => {
          friendRequest.firstName = friendDetails.firstName;
          friendRequest.lastName = friendDetails.lastName;
          this.fileService.getPhotoById(friendDetails.photoId).subscribe(profileImage => {
            ImageUtility(profileImage).subscribe(image => {
              friendRequest.friendIcon = image;
              observer.next(filteredFriendRequests);
            });
          }, err => {
            throw err;
          });
        });
      });
    });
  }

  loadNetworkUserList(userId: string, allUsers: IUser[]): Observable<any> {
    return new Observable(observer => {
      allUsers = allUsers.filter((user: IUser) => { return user.id !== userId; });
      if (allUsers.length === 0) {
        observer.next(allUsers);
      }

      this.friendService.getAllFriendRequests().subscribe(friendRequestArray => {
        friendRequestArray = friendRequestArray.filter((request: IFriend) => {
          return request.userId === userId || request.friendId === userId;
        })
        this.getActiveFriends(allUsers, friendRequestArray).subscribe(mappedFriendList => {
          if (mappedFriendList.length === 0) {
            observer.next(mappedFriendList);
          }
          this.loadFriendsIcons(mappedFriendList).subscribe(result => {
            observer.next(result);
          });
        });
      });
    });
  }

  loadFriendRequests(userId: string): Observable<any> {
    return new Observable(observer => {

      let friendsArray: IUser[] = [];
      this.friendService.getAllFriendRequests().subscribe(friendRequests => {
        let filteredFriendRequests = friendRequests.filter((friendRequest) => {
          return (friendRequest.userId === userId || friendRequest.friendId === userId)
        });

        filteredFriendRequests.forEach(friendRequest => {
          if ((friendRequest.userId === userId || friendRequest.friendId === userId) && friendRequest.status === 'You are friend') {
            friendRequest.uniqueId = friendRequest.userId === userId ? friendRequest.friendId : friendRequest.userId;
            friendRequest.isFriend = true;
            friendsArray.push(friendRequest);
          } else if (friendRequest.friendId === userId && friendRequest.status === 'Request Pending') {
            friendRequest.uniqueId = friendRequest.userId;
            friendRequest.isRequest = true;
            friendsArray.push(friendRequest);
          }
        });

        if (friendsArray.length === 0) {
          observer.next(friendsArray);
          return;
        }

        this.loadFriendRequestDetails(friendsArray).subscribe(result => {
          observer.next(result);
        });

      });

    });
  }

  createNewFriendRequest(friendReqObject: IFriend): Observable<any> {
    return new Observable(observer => {
      this.friendService.createRequest(friendReqObject).subscribe(() => {
        observer.next();
      });
    });
  }

  updateFriendRequest(friendReqObject: any): Observable<any> {
    return new Observable(observer => {
      this.friendService.updateFriendRequest(friendReqObject).subscribe(() => {
        observer.next();
      });
    });
  }

}
