import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Route as RouteIcon, Flag, MapPinned, Map, Car, CalendarClock, Shield, Users } from 'lucide-react';

const AdminSidebar: React.FC = () => {
  const linkBase = 'flex items-center gap-2 px-4 py-2 rounded-lg transition-colors';
  const active = 'bg-blue-300 text-white';
  const inactive = 'text-blue-700 hover:bg-blue-100';

  return (
    <aside className="w-64 shrink-0 h-screen sticky top-0 bg-white border-r border-blue-100 p-4">
      <nav className="flex flex-col gap-2">
        <NavLink to="/dashboard" className={({ isActive }) => `${linkBase} ${isActive ? active : inactive}`}>
          <LayoutDashboard size={18} />
          <span>Dashboard</span>
        </NavLink>
        <NavLink to="/routes" className={({ isActive }) => `${linkBase} ${isActive ? active : inactive}`}>
          <RouteIcon size={18} />
          <span>Rutas</span>
        </NavLink>
        <NavLink to="/countries" className={({ isActive }) => `${linkBase} ${isActive ? active : inactive}`}>
          <Flag size={18} />
          <span>Países</span>
        </NavLink>
        <NavLink to="/states" className={({ isActive }) => `${linkBase} ${isActive ? active : inactive}`}>
          <Map size={18} />
          <span>Departamentos</span>
        </NavLink>
        <NavLink to="/destinations" className={({ isActive }) => `${linkBase} ${isActive ? active : inactive}`}>
          <MapPinned size={18} />
          <span>Destinos</span>
        </NavLink>
        <NavLink to="/vehicles" className={({ isActive }) => `${linkBase} ${isActive ? active : inactive}`}>
          <Car size={18} />
          <span>Vehículos</span>
        </NavLink>
        <NavLink to="/travels" className={({ isActive }) => `${linkBase} ${isActive ? active : inactive}`}>
          <CalendarClock size={18} />
          <span>Viajes</span>
        </NavLink>
        <NavLink to="/roles" className={({ isActive }) => `${linkBase} ${isActive ? active : inactive}`}>
          <Shield size={18} />
          <span>Roles</span>
        </NavLink>
        <NavLink to="/users" className={({ isActive }) => `${linkBase} ${isActive ? active : inactive}`}>
          <Users size={18} />
          <span>Usuarios</span>
        </NavLink>
      </nav>
    </aside>
  );
};

export default AdminSidebar;
