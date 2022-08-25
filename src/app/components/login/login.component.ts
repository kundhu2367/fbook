import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { first } from 'rxjs/operators';

import { AlertService } from '../../services/_helpers/alert.service';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'fb-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", [Validators.required])
  });

  constructor(private router: Router, private auth: AuthenticationService, private alertService: AlertService) {
      this.auth.logout();
  }

  ngOnInit(): void {}

  get form() {
      return this.loginForm;
  }

  get email() {
      return this.loginForm.get("email");
  }

  get password() {
      return this.loginForm.get("password");
  }

  login() {

      if (this.loginForm.invalid) {
          return;
      }

      this.auth.login(this.form.value.email, this.form.value.password)
        .pipe(first()).subscribe(loginResponse => {
          this.router.navigate(['/']);
          if (loginResponse?.message) {
            this.alertService.error(`Error : ${loginResponse?.message}`, true);
          }
      }, error => {
          this.alertService.error(`Error : ${error.error.message}`);
      });

  }

}
