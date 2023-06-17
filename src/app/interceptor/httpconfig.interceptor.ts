import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { getUserToken } from '@root/helpers/tokenStorage';

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token: string = getUserToken();

        if (token && request.url.indexOf('v2-extapi.lunextelecom.com') == -1) {
          request = request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + token) });
          // request = request.clone({ headers: request.headers.set('Authorization', token) });
        } else if(request.url.indexOf('v2-extapi.lunextelecom.com') > -1) {
          request = request.clone({ headers: request.headers.set('Authorization', 'Basic ' + btoa('APGITINCTESTING:apgit11022022')) });

        }

        if (!(request.body instanceof FormData) && !request.headers.has('Content-Type')) {
          request = request.clone({ headers: request.headers.set('Content-Type', 'application/json') });
        }

        request = request.clone({ headers: request.headers.set('Accept', 'application/json') });
        request = request.clone({ headers: request.headers.set('Access-Control-Allow-Origin', '*') }); //KenRoy
        request = request.clone({ headers: request.headers.set('Access-Control-Allow-Headers', 'Content-Type') }); //KenRoy
        request = request.clone({ headers: request.headers.set('Access-Control-Allow-Methods', '*') }); //KenRoy


        return next.handle(request).pipe(
          map((event: HttpEvent<any>) => {
            if (event instanceof HttpResponse) {
            }
            return event;
          }),
          catchError((error: HttpErrorResponse) => {
            let data = {};
            data = {
              reason: error && error.error && error.error.reason ? error.error.reason : '',
              status: error.status
            };
            return throwError(error);
          }));
    }
}
