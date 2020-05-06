import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { Service } from 'app/services/state/service.model';
import { ServicesStore } from './services.store';
import { ServicesGateway } from './services.gateway';

@Injectable({ providedIn: 'root' })
export class ServicesService {

  constructor(
    private store: ServicesStore,
    private gateway: ServicesGateway
  ) { }

  list(): Observable<Service[]> {
    return this.gateway.list().pipe(
      tap(services => this.store.set(services))
    );
  }
}
