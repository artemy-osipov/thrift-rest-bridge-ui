import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';

import { response, services, template } from './services.mocks';

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const { url, method } = request;

    return of(null)
      .pipe(mergeMap(handleRoute))
      .pipe(materialize())
      .pipe(delay(500))
      .pipe(dematerialize());

    function handleRoute() {
      switch (true) {
        case /services$/.test(url) && method === 'GET':
          return getServices();
        case /services\/.*?\/operations\/\w+$/.test(url) && method === 'POST':
          return proxy();
        case /services\/.*?\/operations\/\w+\/template$/.test(url) && method === 'GET':
          return getTemplate();
        default:
          return next.handle(request);
      }
    }

    function getServices() {
      return ok(services);
    }

    function proxy() {
      return ok(response);
    }

    function getTemplate() {
      return ok(template);
    }

    function ok(body?: Object) {
      return of(new HttpResponse({ status: 200, body }));
    }
  }
}

export const fakeBackendProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: FakeBackendInterceptor,
  multi: true
};
