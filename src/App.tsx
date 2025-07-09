import React from 'react';
import AppRoutes from './routes/Index';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-neutral-50 font-sans antialiased text-gray-800">
      <AppRoutes />
    </div>
  );
};

export default App;
