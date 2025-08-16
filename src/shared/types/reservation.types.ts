export interface ReservationReq {
  viajeId: number;
  clienteId: number;
  fechaReserva: Date | string;
  detalle: number[];
}
