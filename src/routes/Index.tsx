import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import PaisesAdminPage from '../pages/Paises/PaisesAdminPage';
import DepartamentosAdminPage from '../pages/Departamentos/DepartamentosAdminPage';
import RoutesAdminPage from '../pages/Routes/RoutesAdminPage';
import LocacionesAdminPage from '../pages/Locaciones/LocacionesAdminPage';
import LoginPage from '../pages/Auth/LoginPage';
import DashboardPage from '../pages/Dashboard/DashboardPage';
import NotFoundPage from '../pages/NotFound/NotFoundPage';
import RouteGuard from './RouteGuard';
import MainLayout from '../components/Layout/MainLayout';
import AdminLayout from '../components/Layout/AdminLayout';

const AppRoutes: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route element={<RouteGuard type="public" />}>
              <Route index element={<LoginPage />} />
              <Route path="login" element={<LoginPage />} />
            </Route>
          </Route>

        <Route path="/dashboard" element={<RouteGuard type="protected"><AdminLayout /></RouteGuard>}>
          <Route index element={<DashboardPage />} />
        </Route>

        <Route path="/routes-admin" element={<RouteGuard type="protected"><AdminLayout /></RouteGuard>}>
          <Route index element={<RoutesAdminPage />} />
        </Route>
        <Route path="/paises-admin" element={<RouteGuard type="protected"><AdminLayout /></RouteGuard>}>
          <Route index element={<PaisesAdminPage />} />
        </Route>
        <Route path="/departamentos-admin" element={<RouteGuard type="protected"><AdminLayout /></RouteGuard>}>
          <Route index element={<DepartamentosAdminPage />} />
        </Route>
        <Route path="/locaciones-admin" element={<RouteGuard type="protected"><AdminLayout /></RouteGuard>}>
          <Route index element={<LocacionesAdminPage />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
