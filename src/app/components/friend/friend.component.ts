import { Component, EventEmitter, Input, OnInit, Output, OnChanges } from '@angular/core';

import { IUser } from 'src/app/interface/user.model';

@Component({
  selector: 'fb-friend',
  templateUrl: './friend.component.html',
  styleUrls: ['./friend.component.scss']
})
export class FriendComponent implements OnInit, OnChanges {

  @Input() routeName: string = "";
  @Input() usersData: IUser[] = [];
  @Output() primaryClick: EventEmitter<IUser> = new EventEmitter;
  @Output() secondaryClick: EventEmitter<IUser> = new EventEmitter;

  currentUser!: IUser;
  isFriendList: Boolean = false;
  isUserList: Boolean = false;
  isNetworks: Boolean = false;
  noUsers: Boolean = false;
  primaryBtnText: string = "Submit";
  secondaryBtnText: string = "Cancel";

  constructor() {}

  ngOnInit(): void {

    this.isFriendList = (this.routeName === 'friendList');
    this.isNetworks = (this.routeName === 'networks');
    this.isUserList = (this.routeName === 'userList');

    switch (this.routeName) {
      case this.routeName='friendList':
        this.primaryBtnText = "Accept";
        this.secondaryBtnText = "Decline";
        break;
      case this.routeName='networks':
        this.primaryBtnText = "Send Request";
        break;
      case this.routeName='userList':
        this.primaryBtnText = "Activate";
        this.secondaryBtnText = "Block";
        break;

      default:
        break;
    }

  }

  ngOnChanges() {
    this.noUsers = (this.usersData.length === 0);
  }

  primaryBtnClick(user: IUser) {
    this.primaryClick.emit(user);
  }

  secondaryBtnClick(user: IUser) {
    this.secondaryClick.emit(user);
  }

}
