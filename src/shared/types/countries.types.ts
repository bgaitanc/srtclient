export interface Country {
  id: string;
  name: string;
  active?: boolean;
}

export interface CreateCountryReq {
  name: string;
}

export interface UpdateCountryReq {
  id: string;
  name: string;
}
