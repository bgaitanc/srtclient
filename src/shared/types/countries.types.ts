export interface Country {
  id: string;
  countryName: string;
  active?: boolean;
}

export interface CreateCountryReq {
  countryName: string;
}

export interface UpdateCountryReq {
  id: string;
  countryName: string;
}
