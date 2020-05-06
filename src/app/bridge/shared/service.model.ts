export interface Service {
  id: string;
  name: string;
  operations: Operation[];
}

export interface Operation {
  name: string;
}

export type OperationId = { serviceId: string, opeartionName: string }
