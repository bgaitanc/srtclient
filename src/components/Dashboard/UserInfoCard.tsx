import React from 'react';
import { Box } from '@mui/material';
import type { UserInfo } from '@srtTypes/users.types.ts';

interface UserInfoCardProps {
  userData?: UserInfo;
}

const UserInfoCard: React.FC<UserInfoCardProps> = ({ userData }) => {
  return (
    userData && (
      <>
        <Box className="bg-white py-8 px-12 rounded-lg shadow-lg max-w-xl w-full">
          <h1 className="text-4xl font-bold text-gray-800 mb-10">
            Información del usuario
          </h1>

          <Box className="grid grid-cols-3 gap-6">
            <p className="text-left text-lg text-blue-700 font-bold">Usuario</p>
            <p className="text-left text-lg text-gray-600 col-span-2">
              {userData!.usuario}
            </p>
            <p className="text-left text-lg text-blue-700 font-bold">Nombres</p>
            <p className="text-left text-lg text-gray-600 col-span-2">
              {userData!.nombres}
            </p>
            <p className="text-left text-lg text-blue-700 font-bold">
              Apellidos
            </p>
            <p className="text-left text-lg text-gray-600 col-span-2">
              {userData!.apellidos}
            </p>
            <p className="text-left text-lg text-blue-700 font-bold">Correo</p>
            <p className="text-left text-lg text-gray-600 col-span-2">
              {userData!.correo}
            </p>
            <p className="text-left text-lg text-blue-700 font-bold">
              Teléfono
            </p>
            <p className="text-left text-lg text-gray-600 col-span-2">
              {userData!.telefono}
            </p>
          </Box>
        </Box>
      </>
    )
  );
};

export default UserInfoCard;
