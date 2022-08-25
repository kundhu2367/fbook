import { Component, OnInit } from '@angular/core';

import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'fb-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isAdmin: boolean = false;
  isUserLoggedIn: boolean = false;

  constructor(private authService: AuthenticationService) {}

  ngOnInit(): void {
    this.authService.isUserAuthenticated.subscribe((response) => {
      this.isUserLoggedIn = response;
    });
    this.authService.isUserAdmin.subscribe((response)=>{
        this.isAdmin = response;
    })
  }

  logout() {
    this.authService.logout();
  }

}
