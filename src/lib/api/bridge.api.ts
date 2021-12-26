import { API_URL } from '$lib/config/environment'
import type { OperationId, Service } from '$lib/data/service.model'

export async function listServices(): Promise<Service[]> {
  const resp = await fetch(`${API_URL}/services`)
  const services: Service[] = await resp.json()
  services.forEach((s) =>
    s.operations.sort((a, b) => a.name.localeCompare(b.name))
  )
  return services
}

export async function getTemplate(operationId: OperationId): Promise<object> {
  const resp = await fetch(
    `${API_URL}/services/${operationId.serviceId}/operations/${operationId.operationName}/template`
  )
  return await resp.json()
}

export async function proxyOperation(
  operationId: OperationId,
  endpoint: string,
  body: object
): Promise<object> {
  const resp = await fetch(
    `${API_URL}/services/${operationId.serviceId}/operations/${operationId.operationName}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        endpoint,
        body,
      }),
    }
  )
  return await resp.json()
}
