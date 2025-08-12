export type SrtResponse<T> = {
  data: T;
  statusCode: number;
  message: string;
  success: boolean;
};
