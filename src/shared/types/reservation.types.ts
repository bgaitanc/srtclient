export interface ReservationReq {
  travelId: number;
  clientId: number;
  reservationDate: Date | string;
  detail: number[];
}

export interface GetReservationInfoResponse {
  reservationId: number
  travelId: number
  reservationDate: string
  detail: DetailInfo[]
  travel: TravelInfo
  route: RouteInfo
  total: number
}

export interface DetailInfo {
  detailReservationId: number
  reservationId: number
  seatNumber: number
}

export interface TravelInfo {
  price: number
  departureDate: string
  arrivalDate: string
}

export interface RouteInfo {
  originLocation: string
  destinationLocation: string
  distanceKM: number
  estimatedTime: string
}
