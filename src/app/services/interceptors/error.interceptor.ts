import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Router } from '@angular/router';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ErrorInterceptor implements HttpInterceptor {

  constructor( private router: Router ) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    return next.handle(request).pipe(catchError((err) => {

        // if (err.status === 404 || err.status == 500 || err.status == 400) {
        //   // this.router.navigate(['/error'], { queryParams : { errorStatus: err.status, errorStatusText: err.statusText } });
        // }

        if (err.status === 401 ) {
          this.router.navigateByUrl('/login');
        }

        return throwError(err);

    }));

  }

}
