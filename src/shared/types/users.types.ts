export type RegisterUserRequest = {
  username: string;
  email: string;
  password: string;
};

export type RegisterUserResponse = {
  userId: string;
  username: string;
  email: string;
};

export type UserInfoResponse = {
  id: string;
  name: string;
  surname: string;
  username: string;
  email: string;
  phoneNumber?: string | null;
  roles: string[];
};

export type AssignUserRoleRequest = {
  userId: string;
  roleId: string;
};

export type RemoveUserRoleRequest = {
  userId: string;
  roleId: string;
};
