export type Role = 'SELLER' | 'ADMIN';

export type ID = string;

export type Response<T> = {
  data?: T;
};
