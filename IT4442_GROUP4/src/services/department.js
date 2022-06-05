import { api } from "./api";

export const getDepartment = (params) => {
  const url = "/deparments";
  return api.get(url, { params: params });
};

export const getListDepartment = () => {
  const url = "/deparments/list-deparment";
  return api.get(url);
};

export const postDepartment = (data) => {
  const url = "/deparments";
  return api.post(url, data);
};

export const putDepartment = (id, data) => {
  const url = `/deparments/${id}`;
  return api.put(url, data);
};
