import type { Readable, Writable } from 'svelte/store'
import { derived, writable } from 'svelte/store'

import type { OperationId, Service } from '$lib/data/service.model'
import { match } from '$lib/utils/string.utils'
import { listServices } from '$lib/api/bridge.api'

class ServicesStore {
  constructor(public services: Writable<Service[]> = writable([])) {}

  exists(id: OperationId | null): Readable<OperationId | null> {
    return derived(this.checkExists(id), ($exists) => ($exists && id) || null)
  }

  checkExists(id: OperationId | null): Readable<boolean> {
    return derived(
      this.services,
      ($services) =>
        (id &&
          $services
            .filter((s) => s.id === id.serviceId)
            .flatMap((s) => s.operations)
            .some((o) => o.name === id.operationName)) ||
        false
    )
  }

  filtered(term: string): Readable<Service[]> {
    if (!term) {
      return this.services
    }
    return derived(this.services, ($services) =>
      $services
        .map((s) => this.keepOnlyMatched(s, term))
        .filter((s) => s.operations.length)
    )
  }

  private keepOnlyMatched(service: Service, term: string): Service {
    if (match(service.name, term)) {
      return service
    } else {
      return {
        ...service,
        operations: service.operations.filter((o) => match(o.name, term)),
      }
    }
  }

  async fetch(): Promise<void> {
    const $services = await listServices()
    this.services.set($services)
    return Promise.resolve()
  }
}

export const servicesStore = new ServicesStore()
