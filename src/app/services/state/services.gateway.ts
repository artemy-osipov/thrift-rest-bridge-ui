import { Injectable } from '@angular/core';
import { Observable, timer } from 'rxjs';

import { environment } from 'environments/environment';

import { Service } from 'app/services/state/service.model';
import { services } from './services.mocks';
import { mapTo } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ServicesGateway {
  serviceResource = environment.apiUrl + '/services/';

  constructor() {}

  list(): Observable<Service[]> {
    return timer(500).pipe(
      mapTo(services)
    );
    // return this.http
      // .get<Service[]>(this.serviceResource);
  }
}
