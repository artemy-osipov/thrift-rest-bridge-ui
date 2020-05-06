import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { Observable } from 'rxjs';

import { ServicesState, ServicesStore } from './services.store';
import { Service } from 'app/services/state/service.model';
import { map } from 'rxjs/operators';
import { services } from './services.mocks';

@Injectable({ providedIn: 'root' })
export class ServicesQuery extends QueryEntity<ServicesState, Service> {

  constructor(protected store: ServicesStore) {
    super(store);
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
      )
  }

  private filterOperations(service: Service, term: string): Service {
    if (service.name.toLowerCase().includes(term)) {
      return service;
    } else {
      return {
        id: service.id,
        name: service.name,
        operations: service.operations.filter(o => o.name.toLowerCase().includes(term))
      };
    }
  }
}
