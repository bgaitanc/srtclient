import React, { useState } from 'react';
import BaseModal from '../../components/shared/BaseModal';
import { useGetAllLocacionesQuery } from '../../shared/services/locaciones.service';

import type { RouteFormModalProps } from '@srtTypes/route.types';

const RouteFormModal: React.FC<RouteFormModalProps> = ({ initialData = {}, onSubmit, onClose, loading, isEdit }) => {
  const { data: locacionesData } = useGetAllLocacionesQuery({});
  const locaciones = (locacionesData?.data ?? []).filter(l => l.activo !== false);
  const [form, setForm] = useState({
    locacionOrigenId: initialData.locacionOrigenId || '',
    locacionDestinoId: initialData.locacionDestinoId || '',
    distanciaKm: initialData.distanciaKm || '',
    tiempoEstimado: initialData.tiempoEstimado || '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      locacionOrigenId: Number(form.locacionOrigenId),
      locacionDestinoId: Number(form.locacionDestinoId),
      distanciaKm: Number(form.distanciaKm),
      tiempoEstimado: form.tiempoEstimado,
    });
  };

  return (
    <BaseModal open={true} onClose={onClose} maxWidth="max-w-md">
      <h2 className="text-2xl font-bold text-blue-700 mb-4">{isEdit ? 'Editar ruta' : 'Nueva ruta'}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-semibold mb-1">Origen</label>
          <select
            name="locacionOrigenId"
            value={form.locacionOrigenId}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
            required
          >
            <option value="">Selecciona una locación</option>
            {locaciones.map(loc => (
              <option key={loc.locacionId} value={loc.locacionId}>{loc.locacionName}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1">Destino</label>
          <select
            name="locacionDestinoId"
            value={form.locacionDestinoId}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
            required
          >
            <option value="">Selecciona una locación</option>
            {locaciones.map(loc => (
              <option key={loc.locacionId} value={loc.locacionId}>{loc.locacionName}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1">Distancia (km)</label>
          <input
            type="number"
            name="distanciaKm"
            value={form.distanciaKm}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1">Tiempo estimado (hh:mm:ss)</label>
          <input
            type="text"
            name="tiempoEstimado"
            value={form.tiempoEstimado}
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
