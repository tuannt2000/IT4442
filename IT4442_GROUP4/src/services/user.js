import { api } from "./api";

export const getUsers = (params) => {
  const url = "/users";
  return api.get(url, { params: params });
};

export const postUser = (data) => {
  const url = "/users";
  return api.post(url, data);
};

export const putUser = (id, data) => {
  const url = `/users/${id}`;
  return api.put(url, data);
};

export const searchUser = (params) => {
  const url = "/users/search";
  return api.get(url, { params: params });
};

export const getListUser = () => {
  const url = "/users/list-author";
  return api.get(url);
};
export const getListAssignee = () => {
  const url = "/users/list-admin";
  return api.get(url);
};

export const getCurrentUser = () => {
  const url = "/users/getInfoUser";
  return api.get(url);
};
