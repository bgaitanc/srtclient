export interface Travel {
  travelId: number;
  routeId: number;
  vehicleId: number;
  driverId: number;
  price: number;
  departureDate: Date;
  arrivalDate: Date;
  statusId: number;
  route: RouteInfo;
  vehicle: VehicleInfo;
  driver: DriverInfo;
  status: string;
}

export interface RouteInfo {
  originDestination: string;
  finalDestination: string;
  distanceKm: number;
  estimatedTime: string;
}

export interface VehicleInfo {
  licensePlate: string;
  model: string;
  capacity: number;
}

export interface DriverInfo {
  name: string;
  surname: string;
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
