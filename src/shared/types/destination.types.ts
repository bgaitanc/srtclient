export interface Destination {
  destinationId: number;
  destinationName: string;
  stateId: number;
  active?: boolean;
}

export interface CreateDestinationReq {
  destinationName: string;
  stateId: number;
}

export interface UpdateDestinationReq {
  destinationId: number;
  destinationName: string;
  stateId: number;
}
