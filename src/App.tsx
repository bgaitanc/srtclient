import React from 'react';
import AppRoutes from './routes/Index';
import { useTokenRefresh } from '@hooks/useTokenRefresh';

const App: React.FC = () => {
  useTokenRefresh();
  return (
    <div className="min-h-screen bg-neutral-50 font-sans antialiased text-gray-800">
      <AppRoutes />
    </div>
  );
};

export default App;
