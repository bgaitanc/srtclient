export interface Travel {
  viajeId: number;
  rutaId: number;
  vehiculoId: number;
  conductorId: number;
  costo: number;
  fechaHoraSalida: Date;
  fechaHoraLlegada: Date;
  estadoId: number;
  ruta: RouteInfo;
  vehiculo: VehicleInfo;
  conductor: DriverInfo;
  estado: string;
}

export interface RouteInfo {
  locacionOrigen: string;
  locacionDestino: string;
  distanciaKM: number;
  tiempoEstimado: string;
}

export interface VehicleInfo {
  placa: string;
  modelo: string;
  capacidad: number;
}

export interface DriverInfo {
  nombres: string;
  apellidos: string;
}

export interface TravelCardProps {
  travel: Travel;
  onReserve: (travel: Travel) => void;
}

export interface TravelDetailModalProps {
  travel: Travel;
  onClose: () => void;
  onSubmit: () => void;
}

export interface TravelFormModalProps {
  initialData: Travel;
  onSubmit: (data: Travel) => void;
  onClose: () => void;
  loading: boolean;
  isEdit: boolean;
}
