import React from 'react';
import type { RolesGuardProps } from '@srtTypes/auth.types.ts';
import { useAppSelector } from '@store/hooks.ts';

const RolesGuard: React.FC<RolesGuardProps> = ({ roles, children }) => {
  const { userRoles } = useAppSelector((state) => state.auth);

  const rolesIntersection = roles.filter((x) => userRoles.includes(x));

  if (rolesIntersection.length === 0) return null;

  return <>{children}</>;
};

export default RolesGuard;
