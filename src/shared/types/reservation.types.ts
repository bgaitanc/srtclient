export interface ReservationReq {
  viajeId: number;
  clienteId: number;
  fechaReserva: Date | string;
  detalle: number[];
}

export interface GetReservationInfoResponse {
  reservaId: number
  viajeId: number
  fechaReserva: string
  detalle: DetalleInfo[]
  viaje: ViajeInfo
  ruta: RutaInfo
  total: number
}

export interface DetalleInfo {
  detalleReservaId: number
  reservaId: number
  numeroAsiento: number
}

export interface ViajeInfo {
  costo: number
  fechaHoraSalida: string
  fechaHoraLlegada: string
}

export interface RutaInfo {
  locacionOrigen: string
  locacionDestino: string
  distanciaKM: number
  tiempoEstimado: string
}
