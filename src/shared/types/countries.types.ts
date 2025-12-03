export interface Country {
  countryId: number;
  countryName: string;
  active?: boolean;
}

export interface CreateCountryReq {
  countryName: string;
}

export interface UpdateCountryReq {
  countryId: number;
  countryName: string;
}
