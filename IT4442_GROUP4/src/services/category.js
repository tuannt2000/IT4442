import { api } from "./api";

export const getListCategory = () => {
  const url = "/categories/list-category";
  return api.get(url);
};

export const getCategory = (params) => {
  const url = `/categories`;
  return api.get(url, { params: params });
};

export const postCategory = (data) => {
  const url = `/categories`;
  return api.post(url,data);
};

export const putCategory = (id,data)=>{
  const url = `/categories/${id}`;
  return api.put(url,data);
};

export const searchCategory = (params) => {
  const url = '/categories/search';
  return api.get(url, { params: params });
};
