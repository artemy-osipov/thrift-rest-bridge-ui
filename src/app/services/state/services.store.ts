import { Injectable } from '@angular/core';
import { EntityState, StoreConfig, EntityStore } from '@datorama/akita';

import { Service } from 'app/services/state/service.model';

export interface ServicesState extends EntityState<Service> { }

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'services' })
export class ServicesStore extends EntityStore<ServicesState, Service> {
  constructor() {
    super({});
  }
}
