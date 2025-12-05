export interface Travel {
  travelId: string;
  routeId: string;
  vehicleId: string;
  driverId: string;
  price: number;
  departureDate: string; // ISO
  arrivalDate: string; // ISO
  status?: string;
  route: RouteInfo;
  vehicle: VehicleInfo;
  driver: DriverInfo;
}

export interface RouteInfo {
  originDestination: string;
  finalDestination: string;
  distanceInKm: number;
  estimatedTime: string; // HH:MM:SS
}

export interface VehicleInfo {
  registrationPlate: string;
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

export type CreateTravelReq = {
  routeId: string;
  vehicleId: string;
  driverId: string;
  price: number;
  departureDate: string;
  arrivalDate: string;
}
