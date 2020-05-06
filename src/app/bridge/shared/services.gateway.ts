import { Injectable } from '@angular/core';
import { Observable, timer } from 'rxjs';

import { environment } from 'environments/environment';

import { Service } from 'app/bridge/shared/service.model';
import { services, template } from './services.mocks';
import { mapTo } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ServicesGateway {
  serviceResource = environment.apiUrl + '/services/';

  constructor() { }

  private url(params: string[]): string {
    return [environment.apiUrl].concat(params).join("/");
  }

  list(): Observable<Service[]> {
    return timer(500).pipe(
      mapTo(services)
    );
    // return this.http
    // .get<Service[]>(this.url("services"));
  }

  getTemplate(serviceId: string, operationName: string): Observable<string> {
    return timer(500).pipe(
      mapTo(JSON.stringify(template))
    );
    // return this.http
      // .get<Service[]>(this.url(["services", serviceId, "operations", operationName, "template"]));
  }
}
