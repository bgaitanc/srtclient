export type UserLoginReq = {
  User: string;
  Password: string;
};

export type UserLoginRes = {
  id: string;
  username: string;
  token: string;
};

export type UserRegisterReq = {
  nombres: string;
  apellidos: string;
  usuario: string;
  contrasena: string;
  correo: string;
  telefono: string;
};

export type UserRegisterRes = {
  userId: string;
  username: string;
  //TODO para loguear después de crear el usuario?
  token?: string;
};
