export interface Locacion {
  locacionId: number;
  locacionName: string;
  departamentoId: number;
  activo?: boolean;
}

export interface CreateLocacionReq {
  locacionName: string;
  departamentoId: number;
}

export interface UpdateLocacionReq {
  locacionId: number;
  locacionName: string;
  departamentoId: number;
}
