export interface RouteCardData {
  id: number;
  origen: string;
  destino: string;
  distanciaKm: number;
  tiempoEstimado: string;
}

export interface RouteCardProps {
  route: RouteCardData;
  onReserve: (route: RouteCardData) => void;
}

export interface RouteDetailModalProps {
  route: RouteCardData;
  onClose: () => void;
}

export interface RouteFormModalProps {
  initialData?: Route;
  onSubmit: (data: any) => void;
  onClose: () => void;
  loading?: boolean;
  isEdit?: boolean;
}

export type Route = {
  rutaId: number;
  locacionOrigenId: number;
  locacionOrigenNombre: string;
  locacionDestinoId: number;
  locacionDestinoNombre: string;
  distanciaKm: number;
  tiempoEstimado: string;
}

export type CreateRouteReq = Omit<Route, 'rutaId' | 'locacionDestinoNombre' | 'locacionOrigenNombre'>;
export type UpdateRouteReq = CreateRouteReq & { rutaId: number };
