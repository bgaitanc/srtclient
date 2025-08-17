export interface Departamento {
  departamentoId: number;
  departamentoName: string;
  paisId: number;
  activo?: boolean;
}

export interface CreateDepartamentoReq {
  departamentoName: string;
  paisId: number;
}

export interface UpdateDepartamentoReq {
  departamentoId: number;
  departamentoName: string;
  paisId: number;
}
