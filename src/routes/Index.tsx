import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import HomePage from '../pages/Home/HomePage';
import LoginPage from '../pages/Auth/LoginPage';
import RegisterPage from '../pages/Auth/RegisterPage';
import DashboardPage from '../pages/Dashboard/DashboardPage';
import NotFoundPage from '../pages/NotFound/NotFoundPage';
import ProtectedRoute from './ProtectedRoute';
import MainLayout from '../components/Layout/MainLayout';
import RoutesPage from '../pages/Routes/RoutesPage';

const AppRoutes: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="routes" element={<ProtectedRoute><RoutesPage /></ProtectedRoute>} />
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

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
