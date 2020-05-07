import { Injectable } from '@angular/core';
import { Observable, timer } from 'rxjs';

import { environment } from 'environments/environment';

import { Service, Operation } from 'app/bridge/shared/service.model';
import { response, services, template } from './services.mocks';
import { mapTo, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ServicesGateway {
  serviceResource = environment.apiUrl + '/services/';

  constructor(
    private http: HttpClient
  ) { }

  private url(params: string[]): string {
    return [environment.apiUrl].concat(params).join("/");
  }

  list(): Observable<Service[]> {
    // return timer(500).pipe(
    // mapTo(services)
    // );
    return this.http
      .get<Service[]>(this.url(["services"]))
      .pipe(
        tap(data => data.forEach(
          s => s.operations.sort(
            (a, b) => a.name.localeCompare(b.name)
          )
        ))
      )
  }

  getTemplate(serviceId: string, operationName: string): Observable<string> {
    // return timer(500).pipe(
    // mapTo(JSON.stringify(template))
    // );
    return this.http
      .get<string>(this.url(["services", serviceId, "operations", operationName, "template"]));
  }

  proxy(serviceId: string, operationName: string, endpoint: string, request: Object): Observable<Object> {
    // return timer(500).pipe(
    // mapTo(response)
    // );
    return this.http
      .post<Object>(
        this.url(["services", serviceId, "operations", operationName]),
        {
          endpoint: endpoint,
          body: request
        }
      );
  }
}
