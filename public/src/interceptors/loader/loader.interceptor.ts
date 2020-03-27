/**
 * Loader interceptor
 */

import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { LoaderService } from '../../stores/loader/loader.service';

@Injectable({
  providedIn:'root'
})

export class LoaderInterceptor implements HttpInterceptor {

  constructor(
    private loaderService: LoaderService,
  ) {}
 
  intercept(req: HttpRequest<any>, next: HttpHandler) {

    this.loaderService.showLoader();

    return next.handle(req)
      .pipe(
        tap(event => {
          if (event instanceof HttpResponse) {
            this.loaderService.hideLoader();
          }
        }, error => {
            this.loaderService.hideLoader();
            console.error(`>>> Error: ${error.status}`);
            console.error(`>>> message: ${error.message}`);
        })
      );
  }
}
