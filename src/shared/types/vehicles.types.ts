export type Vehicle = {
  vehicleId: string;
  registrationPlate: string;
  model: string;
  capacity: number;
};

export type CreateVehicleReq = {
  registrationPlate: string;
  model: string;
  capacity: number;
};

export type UpdateVehicleReq = CreateVehicleReq & { vehicleId: string };
