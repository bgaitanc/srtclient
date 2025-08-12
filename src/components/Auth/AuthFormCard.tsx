import React from 'react';

interface AuthFormCardProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
  icon?: React.ReactNode;
  maxWidth?: string;
}

const AuthFormCard: React.FC<AuthFormCardProps> = ({ children, title, subtitle, icon, maxWidth = 'max-w-md' }) => (
  <div className="flex items-center justify-center min-h-screen">
    <div className={`bg-white shadow-xl rounded-xl p-8 w-full ${maxWidth} mx-auto`}>
      <div className="flex flex-col items-center mb-6">
        <div className="bg-blue-100 rounded-full p-3 mb-2">
          {icon}
        </div>
        <h2 className="text-3xl font-bold text-gray-800">{title}</h2>
        <p className="text-gray-500 text-sm mt-1">{subtitle}</p>
      </div>
      {children}
    </div>
  </div>
);

export default AuthFormCard;
