import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap, map } from 'rxjs/operators';

import { Service, OperationId, ProxyRequest } from 'app/bridge/shared/service.model';
import { ServicesStore } from './services.store';
import { ServicesGateway } from './services.gateway';

const SERVICE_PROXY_CACHE_NAME = 'SERVICE_PROXY';

interface ServiceProxyCache {
  [id: string]: {
    endpoint?: string;
    operations: {
      [name: string]: {
        body?: Object;
      }
    }
  };
}

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
    return this.gateway.getTemplate(
      operationId.serviceId,
      operationId.operationName
    );
  }

  proxy(operationId: OperationId, proxyRequest: ProxyRequest): Observable<Object> {
    return this.gateway.proxy(
      operationId.serviceId,
      operationId.operationName,
      proxyRequest.endpoint,
      proxyRequest.body
    );
  }

  persistProxyRequest(operationId: OperationId, proxyRequest: ProxyRequest) {
    const cache: ServiceProxyCache = JSON.parse(localStorage.getItem(SERVICE_PROXY_CACHE_NAME) || '{}');

    cache[operationId.serviceId] = cache[operationId.serviceId] || { operations: {} };
    cache[operationId.serviceId].endpoint = proxyRequest.endpoint;
    cache[operationId.serviceId].operations[operationId.operationName]
      = cache[operationId.serviceId]?.operations?.[operationId.operationName] || {};
    cache[operationId.serviceId].operations[operationId.operationName].body = proxyRequest.body;

    localStorage.setItem(SERVICE_PROXY_CACHE_NAME, JSON.stringify(cache));
  }

  getProxyRequest(operationId: OperationId): Observable<ProxyRequest> {
    const cache: ServiceProxyCache = JSON.parse(localStorage.getItem(SERVICE_PROXY_CACHE_NAME) || '{}');
    const endpoint = cache[operationId.serviceId]?.endpoint || '';
    const cachedBody = cache[operationId.serviceId]?.operations?.[operationId.operationName]?.body;
    const rxBody = cachedBody ? of(cachedBody) : this.getTemplate(operationId);

    return rxBody.pipe(
      map(body => ({ endpoint, body }))
    );
  }
}
