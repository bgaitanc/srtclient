export type RouteFormValues = {
  originDestinationId: number;
  finalDestinationId: number;
  distanceKm: number;
  estimatedTime: string;
};
export interface RouteCardData {
  id: number;
  origin: string;
  destination: string;
  distanceKm: number;
  estimatedTime: string;
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
  initialData?: Partial<RouteFormValues>;
  onSubmit: (data: RouteFormValues) => void;
  onClose: () => void;
  loading?: boolean;
  isEdit?: boolean;
}

export type Route = {
  routeId: number;
  originDestinationId: number;
  originDestinationName: string;
  finalDestinationId: number;
  finalDestinationName: string;
  distanceKm: number;
  estimatedTime: string;
}

export type CreateRouteReq = Omit<Route, 'routeId' | 'finalDestinationName' | 'originDestinationName'>;
export type UpdateRouteReq = CreateRouteReq & { routeId: number };
