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
  initialData?: {
    rutaId?: number;
    locacionOrigenId?: number;
    locacionOrigenNombre?: string;
    locacionDestinoId?: number;
    locacionDestinoNombre?: string;
    distanciaKm?: number;
    tiempoEstimado?: string;
  };
  onSubmit: (data: any) => void;
  onClose: () => void;
  loading?: boolean;
  isEdit?: boolean;
}
