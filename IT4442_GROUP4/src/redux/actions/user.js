import * as types from "../constants/user";

export const getListUser = () => ({
  type: types.GET_LIST_USER,
});

export const setListUserSuccess = (data) => ({
  type: types.SET_LIST_USER_SUCCESS,
  payload: data,
});

export const getListAssignee = () => ({
  type: types.GET_LIST_ASSIGNEE,
});

export const setListAssigneeSuccess = (data) => ({
  type: types.SET_LIST_ASSIGNEE_SUCCESS,
  payload: data,
});

export const getUser = (data) => ({
  type: types.GET_USER,
  payload: data,
});

export const getUserSuccess = (data) => ({
  type: types.SET_USER_SUCCESS,
  payload: data,
});

export const postUser = (data, onSuccess, onError) => ({
  type: types.POST_USER,
  payload: data,
  onSuccess,
  onError,
});

export const putUser = (data, onSuccess, onError) => ({
  type: types.PUT_USER,
  payload: data,
  onSuccess,
  onError,
});

export const searchUser = (data) => ({
  type: types.SEARCH_USER,
  payload: data,
});

export const searchUserSuccess = (data) => ({
  type: types.SEARCH_USER_SUCCESS,
  payload: data,
});

export const getCurrentUser = () => ({
  type: types.GET_CURRENT_USER,
});

export const setCurrentUserSuccess = (data) => ({
  type: types.SET_CURRENT_USER_SUCCESS,
  payload: data,
});
