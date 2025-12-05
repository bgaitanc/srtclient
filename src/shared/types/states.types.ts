export interface States {
  id: string;
  name: string;
  countryId: string;
  active?: boolean;
}

export interface CreateStateReq {
  stateName: string;
  countryId: string;
}

export interface UpdateStateReq {
  id: string;
  stateName: string;
  countryId: string;
}
