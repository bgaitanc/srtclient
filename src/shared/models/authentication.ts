import type { JwtPayload } from 'jwt-decode';

export type UserLoginReq = {
  Username: string;
  Password: string;
};

export type UserLoginRes = {
  token: string;
  refreshToken: string;
};

export type UserRegisterReq = {
  Name: string;
  Surname: string;
  Username: string;
  Password: string;
  Email: string;
  PhoneNumber: string;
};

export type UserRegisterRes = {
  userId: string;
  username: string;
};

export type CustomJwtPayload = JwtPayload & {
  unique_name: string;
  nameid: number;
  roles: string;
};

export type RefreshTokenReq = {
  AccessToken: string;
  RefreshToken: string;
};
