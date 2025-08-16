export type ReservationDetail = {
  viajeId: number;
  capacidad: number;
  asientosReservados: number[];
};

export type ReservationDetails = ReservationDetail;

export type TravelReservationFormProps = {
  viajeId: number;
  onCancel: () => void;
};
