import React, { useState } from 'react';

import type { RouteFormModalProps } from '@srtTypes/route.types';

const RouteFormModal: React.FC<RouteFormModalProps> = ({ initialData = {}, onSubmit, onClose, loading, isEdit }) => {
  const [form, setForm] = useState({
    locacionOrigenNombre: initialData.locacionOrigenNombre || '',
    locacionDestinoNombre: initialData.locacionDestinoNombre || '',
    distanciaKm: initialData.distanciaKm || '',
    tiempoEstimado: initialData.tiempoEstimado || '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ ...form, rutaId: initialData.rutaId });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md relative">
        <button
          className="absolute top-2 right-2 text-gray-400 hover:text-blue-600 text-xl"
          onClick={onClose}
        >
          ×
        </button>
        <h2 className="text-2xl font-bold text-blue-700 mb-4">{isEdit ? 'Editar ruta' : 'Nueva ruta'}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-1">Origen (ID)</label>
            <input
              type="number"
              name="locacionOrigenId"
              value={form.locacionOrigenNombre}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Destino (ID)</label>
            <input
              type="number"
              name="locacionDestinoId"
              value={form.locacionDestinoNombre}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
              required
            />
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
      </div>
    </div>
  );
};

export default RouteFormModal;
