import { Component, OnInit } from '@angular/core';

import { LoaderService } from '../../services/_helpers/loader.service';

@Component({
  selector: 'fb-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {

  showLoader: boolean = false;
  constructor(public loaderService: LoaderService) { }

  ngOnInit(): void {

    this.loaderService.loader.subscribe((response) => {
      this.showLoader = response;

      //Since herokuapp api is taking long time to resolve, disabling the loader for user after 2 mins
      // if (response) {
      //   setTimeout(()=>{
      //     this.showLoader = false;
      //   }, 120000);
      // }
    });

  }

}
