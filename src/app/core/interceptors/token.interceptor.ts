import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { from, Observable } from 'rxjs';
import { Storage } from '@ionic/storage-angular';
import { mergeMap } from 'rxjs/operators';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(
    private storage: Storage
  ) {
    this.storage.create();
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return from(this.storage.get('TOKEN')).pipe(mergeMap(token => {
      if(token === null) {
        return next.handle(request);
      } else {
        let headers = new HttpHeaders();
        headers = headers.append('Authorization', 'Bearer ' + token);
        const clone = request.clone({ headers });
        return next.handle(clone);
      }
    }));
  }
}
