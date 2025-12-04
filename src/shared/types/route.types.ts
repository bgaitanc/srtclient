export type RouteFormValues = {
  originDestinationId: string;
  finalDestinationId: string;
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
  originDestinationId: string;
  originDestinationName: string;
  finalDestinationId: string;
  finalDestinationName: string;
  distanceKm: number;
  estimatedTime: string;
}

export type CreateRouteReq = Omit<Route, 'routeId' | 'finalDestinationName' | 'originDestinationName'>;
export type UpdateRouteReq = CreateRouteReq & { routeId: number };
