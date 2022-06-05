import { api } from "./api";

export const postEmailForgot = (data) => {
  const url = '/reset-password';
  return api.post(url, data);
};

export const putEmailReset = (data) => {
  const url = '/reset-password';
  return api.put(url, data);
};

export const putChangePassword = (data) => {
  const url = '/users/changePassword';
  return api.put(url, data);
};
