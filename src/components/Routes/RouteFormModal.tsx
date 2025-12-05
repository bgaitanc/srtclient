import React, { useState } from 'react';
import BaseModal from '../../components/shared/BaseModal';
import { useGetAllDestinationsQuery } from '../../shared/services/destinations.service';

import type { RouteFormModalProps } from '@srtTypes/route.types';

type FormState = {
  originDestinationId: string;
  finalDestinationId: string;
  distanceKm: string | number;
  estimatedTime: string;
};

const RouteFormModal: React.FC<RouteFormModalProps> = ({ initialData, onSubmit, onClose, loading, isEdit }) => {
  const { data: destinationsData } = useGetAllDestinationsQuery({});
  const destinations = (destinationsData?.data ?? []).filter(l => l.active !== false);
  const [form, setForm] = useState<FormState>({
    originDestinationId: (initialData?.originDestinationId as string) ?? '',
    finalDestinationId: (initialData?.finalDestinationId as string) ?? '',
    distanceKm: initialData?.distanceKm ?? '',
    estimatedTime: initialData?.estimatedTime ?? '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      originDestinationId: form.originDestinationId,
      finalDestinationId: form.finalDestinationId,
      distanceKm: Number(form.distanceKm),
      estimatedTime: form.estimatedTime,
    });
  };

  return (
    <BaseModal open={true} onClose={onClose} maxWidth="max-w-md">
      <h2 className="text-2xl font-bold text-blue-700 mb-4">{isEdit ? 'Editar ruta' : 'Nueva ruta'}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-semibold mb-1">Origen</label>
          <select
            name="originDestinationId"
            value={form.originDestinationId}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
            required
          >
            <option value="">Selecciona una locación</option>
            {destinations.map(loc => (
              <option key={loc.destinationId} value={loc.destinationId}>{loc.destinationName}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1">Destino</label>
          <select
            name="finalDestinationId"
            value={form.finalDestinationId}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
            required
          >
            <option value="">Selecciona una locación</option>
            {destinations.map(loc => (
              <option key={loc.destinationId} value={loc.destinationId}>{loc.destinationName}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1">Distancia (km)</label>
          <input
            type="number"
            name="distanceKm"
            value={form.distanceKm}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1">Tiempo estimado (hh:mm:ss)</label>
          <input
            type="text"
            name="estimatedTime"
            value={form.estimatedTime}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
            required
            placeholder="00:30:00"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition duration-300"
          disabled={loading}
        >
          {loading ? 'Guardando...' : isEdit ? 'Actualizar' : 'Crear'}
        </button>
      </form>
    </BaseModal>
  );
};

export default RouteFormModal;
