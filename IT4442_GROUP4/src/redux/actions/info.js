import { SET_SIZE_SCREEN, SET_STATUS_SIDEBAR } from "../constants/info";

export const setStatusSideBar = (data) => ({
  type: SET_STATUS_SIDEBAR,
  payload: data,
});

export const setSizeScreen = (data) => ({
  type: SET_SIZE_SCREEN,
  payload: data,
});
