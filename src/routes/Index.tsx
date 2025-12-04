import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import RoutesAdminPage from '../pages/Routes/RoutesAdminPage';
import LoginPage from '../pages/Auth/LoginPage';
import StatesAdminPage from '../pages/States/StatesAdminPage';
import CountriesAdminPage from '../pages/Countries/CountriesAdminPage';
import DestinationsAdminPage from '../pages/Destinations/DestinationAdminPage';
import VehiclesAdminPage from '../pages/Vehicles/VehiclesAdminPage';
import TravelsAdminPage from '../pages/Travels/TravelsAdminPage';
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

        <Route path="/routes" element={<RouteGuard type="protected"><AdminLayout /></RouteGuard>}>
          <Route index element={<RoutesAdminPage />} />
        </Route>
        <Route path="/countries" element={<RouteGuard type="protected"><AdminLayout /></RouteGuard>}>
          <Route index element={<CountriesAdminPage />} />
        </Route>
        <Route path="/states" element={<RouteGuard type="protected"><AdminLayout /></RouteGuard>}>
          <Route index element={<StatesAdminPage />} />
        </Route>
        <Route path="/destinations" element={<RouteGuard type="protected"><AdminLayout /></RouteGuard>}>
          <Route index element={<DestinationsAdminPage />} />
        </Route>
        <Route path="/vehicles" element={<RouteGuard type="protected"><AdminLayout /></RouteGuard>}>
          <Route index element={<VehiclesAdminPage />} />
        </Route>
        <Route path="/travels" element={<RouteGuard type="protected"><AdminLayout /></RouteGuard>}>
          <Route index element={<TravelsAdminPage />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
