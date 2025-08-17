import { useState } from 'react';
import { useCreateRouteMutation, useUpdateRouteMutation, useGetAllRoutesQuery, useDeleteRouteMutation } from '../shared/services/routes.service';
import { toast } from 'react-hot-toast';
import type { Route, RouteFormValues } from '../shared/types/route.types';

export function useRoutesAdmin() {
  const { data, isLoading, error, refetch } = useGetAllRoutesQuery();
  const routes: Route[] = data?.data ?? [];
  const [showModal, setShowModal] = useState(false);
  const [editRoute, setEditRoute] = useState<Route | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [routeToDelete, setRouteToDelete] = useState<number | null>(null);
  const [createRoute] = useCreateRouteMutation();
  const [updateRoute] = useUpdateRouteMutation();
  const [deleteRoute] = useDeleteRouteMutation();
  const [modalLoading, setModalLoading] = useState(false);

  const handleCreate = () => {
    setEditRoute(null);
    setShowModal(true);
  };

  const handleEdit = (route: Route) => {
    setEditRoute(route);
    setShowModal(true);
  };

  const handleDelete = (rutaId: number) => {
    setRouteToDelete(rutaId);
    setConfirmOpen(true);
  };

  const confirmDelete = async () => {
    if (routeToDelete == null) return;
    setConfirmOpen(false);
    try {
      await deleteRoute(routeToDelete).unwrap();
      toast.success('Ruta eliminada correctamente');
      refetch();
    } catch {
      toast.error('Error al eliminar la ruta');
    } finally {
      setRouteToDelete(null);
    }
  };

  const handleSubmit = async (data: RouteFormValues) => {
    setModalLoading(true);
    try {
      if (editRoute) {
        await updateRoute({ ...data, rutaId: editRoute.rutaId }).unwrap();
        toast.success('Ruta actualizada');
      } else {
        await createRoute(data).unwrap();
        toast.success('Ruta creada');
      }
      setShowModal(false);
      refetch();
    } catch {
      toast.error('Error al guardar la ruta');
    } finally {
      setModalLoading(false);
    }
  };

  return {
    routes, isLoading, error, refetch,
    showModal, setShowModal,
    editRoute, setEditRoute,
    confirmOpen, setConfirmOpen,
    routeToDelete, setRouteToDelete,
    modalLoading, setModalLoading,
    handleCreate, handleEdit, handleDelete,
    confirmDelete, handleSubmit
  };
}
