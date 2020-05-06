export interface Service {
  id: string;
  name: string;
  operations: Operation[];
}

export interface Operation {
  name: string;
}
