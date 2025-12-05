export interface Destination {
  destinationId: string;
  destinationName: string;
  stateId: string;
  active?: boolean;
}

export interface CreateDestinationReq {
  destinationName: string;
  stateId: string;
}

export interface UpdateDestinationReq {
  destinationId: string;
  destinationName: string;
  stateId: string;
}
