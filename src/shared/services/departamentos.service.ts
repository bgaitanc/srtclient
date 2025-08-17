import { srtApi } from './base/srtApi.service';
import type { SrtResponse } from '../types/srtApi.types';
import type { Departamento, CreateDepartamentoReq, UpdateDepartamentoReq } from '../types/departamento.types';

export const departamentosApi = srtApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllDepartamentos: builder.query<SrtResponse<Departamento[]>, { paisId?: number }>({
      query: ({ paisId } = {}) => ({
        url: '/departamentos/all',
        method: 'GET',
        params: paisId ? { paisId } : undefined,
      }),
    }),
    createDepartamento: builder.mutation<SrtResponse<{departamentoId: number}>, CreateDepartamentoReq>({
      query: (body) => ({
        url: '/departamentos/create',
        method: 'POST',
        body,
      }),
    }),
    updateDepartamento: builder.mutation<SrtResponse<{departamentoId: number}>, UpdateDepartamentoReq>({
      query: (body) => ({
        url: '/departamentos/update',
        method: 'PUT',
        body,
      }),
    }),
    deleteDepartamento: builder.mutation<SrtResponse<any>, number>({
      query: (departamentoId) => ({
        url: `/departamentos/${departamentoId}/delete`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const { useGetAllDepartamentosQuery, useCreateDepartamentoMutation, useUpdateDepartamentoMutation, useDeleteDepartamentoMutation } = departamentosApi;
