export interface Country {
  id: number;
  name: string;
  active?: boolean;
}

export interface CreateCountryReq {
  name: string;
}

export interface UpdateCountryReq {
  id: number;
  name: string;
}
