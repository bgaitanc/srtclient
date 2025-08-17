export interface Pais {
  paisId: number;
  paisName: string;
  activo?: boolean;
}

export interface CreatePaisReq {
  paisName: string;
}

export interface UpdatePaisReq {
  paisId: number;
  paisName: string;
}
