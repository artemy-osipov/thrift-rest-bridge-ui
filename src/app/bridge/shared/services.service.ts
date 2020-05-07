import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { Service, OperationId } from 'app/bridge/shared/service.model';
import { ServicesStore } from './services.store';
import { ServicesGateway } from './services.gateway';

@Injectable({ providedIn: 'root' })
export class ServicesService {

  constructor(
    private store: ServicesStore,
    private gateway: ServicesGateway
  ) { }

  list(): Observable<Service[]> {
    return this.gateway.list()
      .pipe(
        tap(services => this.store.set(services))
      );
  }

  getTemplate(operationId: OperationId): Observable<string> {
    return this.gateway.getTemplate(operationId.serviceId, operationId.opeartionName);
  }

  proxy(operationId: OperationId, endpoint: string, request: Object): Observable<Object> {
    return this.gateway.proxy(
      operationId.serviceId,
      operationId.opeartionName,
      endpoint,
      request
    );
  }
}
