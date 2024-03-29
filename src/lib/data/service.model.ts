export interface Service {
  id: string
  name: string
  operations: Operation[]
}

export interface Operation {
  name: string
}

export interface OperationId {
  serviceId: string
  operationName: string
}

export interface ProxyRequest {
  endpoint: string
  body: object
}
