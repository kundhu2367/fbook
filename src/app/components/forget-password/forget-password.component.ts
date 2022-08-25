import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { formatDate } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { AlertService } from '../../services/_helpers/alert.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'fb-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent implements OnInit {

  @Output() resetViewEnable: EventEmitter<any> = new EventEmitter<any>();

  forgetPassForm = new FormGroup({
      email: new FormControl("", [Validators.required, Validators.email]),
      dob: new FormControl("", [Validators.required])
  });

  constructor(private userService: UserService, private alertService: AlertService) {}

  ngOnInit(): void {}

  get form() {
      return this.forgetPassForm;
  }

  get email() {
      return this.forgetPassForm.get("email");
  }

  get dob() {
      return this.forgetPassForm.get("dob");
  }

  submit() {
      if (this.forgetPassForm.invalid) {
          return;
      }

  this.userService.getUserByEmail(this.forgetPassForm.value.email).subscribe(
      (userData: any) => {
          if (!userData || userData.length <= 0) {
            this.alertService.error("User Does not exist!");
            return;
          }
          let UserDetails = userData[0];
          if (this.forgetPassForm.value.dob !== formatDate(UserDetails.dob, 'yyyy-MM-dd', 'en')) {
            this.alertService.error("user name and Date of Birth does not match");
            return;
          }

          let resetSet =  {
              id: UserDetails.id,
              resetFlag: true
          }
          this.resetViewEnable.emit(resetSet)
      },
      (error: any) => {
          this.alertService.error(`Error : ${error.error.message}`);
      });

  }

}
