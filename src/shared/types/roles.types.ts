export type Role = {
  id: string;
  name: string;
};

export type CreateRoleReq = {
  name: string;
};

export type UpdateRoleReq = {
  id: string;
  name: string;
};

export type DeleteRoleReq = {
  id: string;
};
