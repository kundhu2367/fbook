import { Component, OnDestroy, OnInit, NgZone } from '@angular/core';

import { Subscription } from 'rxjs';

import   * as $  from "jquery";

import { AlertService } from 'src/app/services/_helpers/alert.service';


@Component({
  selector: 'fb-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit, OnDestroy {

  private subscription!: Subscription;
  message: any;

  constructor(private ngZone: NgZone ,private alertService: AlertService) { }

  ngOnInit() {

    this.subscription = this.alertService.getAlert().subscribe(message => {

        switch (message && message.type) {
            case 'success':
                message.cssClass = 'alert alert-success';
                break;
            case 'error':
                message.cssClass = 'alert alert-danger';
                break;
        }

      this.message = message;

      if (message) {
        $('.alert').show();
        this.ngZone.runOutsideAngular(() => {
          setTimeout(() => {
            $('.alert').hide();
          }, 3000);
        });
      }

    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}

