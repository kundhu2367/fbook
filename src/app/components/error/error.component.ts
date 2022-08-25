import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivationStart, Router } from '@angular/router';

@Component({
  selector: 'fb-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit {

  status: any;
  statusText: any;

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.status = this.route.snapshot.queryParams['errorStatus'];
    this.statusText = this.route.snapshot.queryParams['errorStatusText'];
  }

}
