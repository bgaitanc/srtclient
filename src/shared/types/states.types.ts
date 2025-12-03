export interface States {
  stateId: number;
  stateName: string;
  countryId: number;
  active?: boolean;
}

export interface CreateStateReq {
  stateName: string;
  countryId: number;
}

export interface UpdateStateReq {
  stateId: number;
  stateName: string;
  countryId: number;
}
