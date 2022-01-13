import type { OperationId, ProxyRequest } from './service.model'

const SERVICE_PROXY_CACHE_NAME = 'SERVICE_PROXY'

type BridgeCache = {
  [id: string]: ServiceCache | undefined
}

type ServiceCache = {
  endpoint?: string
  operations?: {
    [name: string]: OperationCache | undefined
  }
}

type OperationCache = {
  body?: object
}

type ProxyRequestCache = {
  endpoint: string
  body?: object
}

export function persistProxyRequest(
  operationId: OperationId,
  proxyRequest: ProxyRequest
) {
  const cache: BridgeCache = JSON.parse(
    localStorage.getItem(SERVICE_PROXY_CACHE_NAME) || '{}'
  )
  cache[operationId.serviceId] = {
    endpoint: proxyRequest.endpoint,
    operations: {
      ...cache[operationId.serviceId]?.operations,
      [operationId.operationName]: {
        body: proxyRequest.body,
      },
    },
  }
  localStorage.setItem(SERVICE_PROXY_CACHE_NAME, JSON.stringify(cache))
}

export function getProxyRequest(operationId: OperationId): ProxyRequestCache {
  const cache: BridgeCache = JSON.parse(
    localStorage.getItem(SERVICE_PROXY_CACHE_NAME) || '{}'
  )
  const endpoint = cache[operationId.serviceId]?.endpoint || ''
  const body =
    cache[operationId.serviceId]?.operations?.[operationId.operationName]?.body

  return { endpoint, body }
}
