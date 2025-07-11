import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import HomePage from '../pages/Home/HomePage';
import LoginPage from '../pages/Auth/LoginPage';
import DashboardPage from '../pages/Dashboard/DashboardPage';
import NotFoundPage from '../pages/NotFound/NotFoundPage';
import ProtectedRoute from './ProtectedRoute';
import MainLayout from '../components/Layout/MainLayout';

const AppRoutes: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="login" element={<LoginPage />} />
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
