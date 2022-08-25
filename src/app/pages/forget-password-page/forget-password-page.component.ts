import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'fb-forget-password-page',
  templateUrl: './forget-password-page.component.html',
  styleUrls: ['./forget-password-page.component.scss']
})
export class ForgetPasswordPageComponent implements OnInit {

  resetView: boolean = false;
  userID!: string

  constructor() { }

  ngOnInit(): void {
  }

  changeToReset(resetSet : any) {
    this.resetView = resetSet.resetFlag;
    this.userID = resetSet.id;
  }

}
