import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import HomePage from '../pages/Home/HomePage';
import PaisesAdminPage from '../pages/Paises/PaisesAdminPage';
import DepartamentosAdminPage from '../pages/Departamentos/DepartamentosAdminPage';
import RoutesAdminPage from '../pages/Routes/RoutesAdminPage';
import LocacionesAdminPage from '../pages/Locaciones/LocacionesAdminPage';
import LoginPage from '../pages/Auth/LoginPage';
import RegisterPage from '../pages/Auth/RegisterPage';
import DashboardPage from '../pages/Dashboard/DashboardPage';
import NotFoundPage from '../pages/NotFound/NotFoundPage';
import ProtectedRoute from './ProtectedRoute';
import MainLayout from '../components/Layout/MainLayout';
import TravelsPage from '../pages/Travels/TravelsPage.tsx';
import RoutesPage from '../pages/Routes/RoutesPage.tsx';

const AppRoutes: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="travels" element={<ProtectedRoute><TravelsPage /></ProtectedRoute>} />
          <Route path="routes" element={<RoutesPage />} />
        </Route>

        <Route path="/dashboard" element={<ProtectedRoute />}>
          <Route
            index
            element={
              <MainLayout>
                <DashboardPage />
              </MainLayout>
            }
          />
        </Route>

        <Route path="/routes-admin" element={<MainLayout><RoutesAdminPage /></MainLayout>} />
        <Route path="/paises-admin" element={<MainLayout><PaisesAdminPage /></MainLayout>} />
        <Route path="/departamentos-admin" element={<MainLayout><DepartamentosAdminPage /></MainLayout>} />
        <Route path="/locaciones-admin" element={<MainLayout><LocacionesAdminPage /></MainLayout>} />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
