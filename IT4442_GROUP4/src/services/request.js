import { api } from "./api";

export const getRequest = (params) => {
  const url = "/requests";
  return api.get(url, { params: params });
};

export const getRequestById = (id) => {
  const url = `/requests/${id}`;
  return api.get(url);
};

export const getRequestByFilter = (params) => {
  const url = "/requests/filter";
  return api.get(url, { params: params });
};

export const postRequest = (params) => {
  const url = "/requests";
  return api.post(url, params);
};

export const deleteRequest = (id) => {
  const url = `/requests/${id}`;
  return api.delete(url);
};

export const putRequest = (id, data) => {
  const url = `/requests/${id}`;
  return api.put(url, data);
};

export const postComment = (id, params) => {
  const url = `/comments/${id}`;
  return api.post(url, params);
};

export const getHistoryRequest = (params) => {
  const url = "/request_change";
  return api.get(url, { params: params });
};

export const getCommentById = (id, params) => {
  const url = `/history-requests/${id}`;
  return api.get(url, { params: params });
};
