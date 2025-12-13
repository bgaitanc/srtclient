import React, { useState } from 'react';

import type { Travel, TravelFormModalProps } from '@srtTypes/travels.types.ts';

const TravelFormModal: React.FC<TravelFormModalProps> = ({ initialData, onSubmit, onClose, loading, isEdit }) => {
  const [form, setForm] = useState({
    originDestination: initialData.route.originDestination,
    finalDestination: initialData.route.finalDestination,
    distanceInKm: initialData.route.distanceInKm,
    estimatedTime: initialData.route.estimatedTime,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === 'distanceInKm' ? Number(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...initialData,
      route: {
        ...initialData.route,
        ...form,
      },
    } as Travel);
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
            <label className="block text-sm font-semibold mb-1">Origen</label>
            <input
              type="text"
              name="originDestination"
              value={form.originDestination}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Destino</label>
            <input
              type="text"
              name="finalDestination"
              value={form.finalDestination}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Distancia (km)</label>
            <input
              type="number"
              name="distanceInKm"
              value={form.distanceInKm}
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
      </div>
    </div>
  );
};

export default TravelFormModal;
