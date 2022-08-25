import { Component, OnInit } from '@angular/core';

import { IUser } from 'src/app/interface/user.model';

import { AlertService } from '../../services/_helpers/alert.service';
import { AuthenticationService } from '../../services/authentication.service';
import { UserHelperService } from '../../services/_helpers/user-helper.service';

@Component({
  selector: 'fb-friend-list',
  templateUrl: './friend-list.component.html',
  styleUrls: ['./friend-list.component.scss']
})
export class FriendListComponent implements OnInit {

  currentUser!: IUser;
  users: IUser[] = [];

  constructor(private authService: AuthenticationService, private userHelper: UserHelperService, private alertService: AlertService) {
    this.currentUser = this.authService.currentUserValue || {};
  }

  ngOnInit(): void {
    let currentUserID: any = this.currentUser._id
    this.userHelper.loadFriendRequests(currentUserID).subscribe((finalRequesters: IUser[]) => {
      this.users = finalRequesters;
    }, err => {
      this.alertService.error(`Error : Data Loading Error: ${err.status} - ${err.statusText}` );
      throw err;
    });
  }

  acceptFriendReq(friend: IUser) {
    let friendRequestObject = {
      id: friend.id,
      userId: friend.friendId,
      friendId: friend.userId,
      status: 'You are friend'
    }

    this.userHelper.updateFriendRequest(friendRequestObject).subscribe(() => {
      this.ngOnInit();
    }, err => {
      this.alertService.error(`Error : Data Loading Error: ${err.status} - ${err.statusText}` );
      throw err;
    });
  }

  rejectFriendReq(friend: IUser) {
    let friendRequestObject = {
      id: friend.id,
      userId: friend.friendId,
      friendId: friend.userId,
      status: 'Request Rejected'
    }

    this.userHelper.updateFriendRequest(friendRequestObject).subscribe(() => {
      this.ngOnInit();
    }, err => {
      this.alertService.error(`Error : Data Loading Error: ${err.status} - ${err.statusText}` );
      throw err;
    });
  }

}
