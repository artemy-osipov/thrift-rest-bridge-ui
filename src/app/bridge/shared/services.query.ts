import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { Observable } from 'rxjs';

import { ServicesState, ServicesStore } from './services.store';
import { Service } from 'app/bridge/shared/service.model';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ServicesQuery extends QueryEntity<ServicesState, Service> {

  constructor(protected sStore: ServicesStore) {
    super(sStore);
  }

  filtered(term: string): Observable<Service[]> {
    return this.selectAll().pipe(
      map(sx => this.filter(sx, term.toLowerCase()))
    );
  }

  private filter(services: Service[], term: string): Service[] {
    return services
      .map(
        s => this.filterOperations(s, term)
      )
      .filter(
        s => s.operations.length
      );
  }

  private filterOperations(service: Service, term: string): Service {
    if (service.name.toLowerCase().includes(term)) {
      return service;
    } else {
      return {
        ...service,
        operations: service.operations.filter(o => o.name.toLowerCase().includes(term))
      };
    }
  }
}
