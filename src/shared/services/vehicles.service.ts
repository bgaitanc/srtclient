import { srtApi } from './base/srtApi.service';
import type { SrtResponse } from '../types/srtApi.types';
import type { Vehicle, CreateVehicleReq, UpdateVehicleReq } from '../types/vehicles.types';

export const vehiclesApi = srtApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllVehicles: builder.query<SrtResponse<Vehicle[]>, void>({
      query: () => ({
        url: '/vehicles/all',
        method: 'GET',
      }),
    }),
    createVehicle: builder.mutation<SrtResponse<{ vehicleId: string }>, CreateVehicleReq>({
      query: (req) => ({
        url: '/vehicles/create',
        method: 'POST',
        body: req,
      }),
    }),
    updateVehicle: builder.mutation<SrtResponse<{ vehicleId: string }>, UpdateVehicleReq>({
      query: (req) => ({
        url: '/vehicles/update',
        method: 'PUT',
        body: req,
      }),
    }),
  }),
});

export const { useGetAllVehiclesQuery, useCreateVehicleMutation, useUpdateVehicleMutation } = vehiclesApi;
