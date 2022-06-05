import * as types from "../constants/department";

export const getDepartment = (data) => ({
  type: types.GET_DEPARTMENT,
  payload: data,
});

export const setDepartment = (data) => ({
  type: types.SET_DEPARTMENT,
  payload: data,
});

export const getListDepartment = () => ({
  type: types.GET_LIST_DEPARTMENT,
});

export const setListDepartment = (data) => ({
  type: types.SET_LIST_DEPARTMENT,
  payload: data,
});

export const createDepartment = (data) => ({
  type: types.CREATE_DEPARTMENT,
  payload: data,
});

export const updateDepartment = (data) => ({
  type: types.UPDATE_DEPARTMENT,
  payload: data,
});
