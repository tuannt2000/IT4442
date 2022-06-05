import * as types from "../constants/request";
/**
 * GET_REQUEST
 */
export const getRequest = (data) => ({
  type: types.GET_REQUEST,
  payload: data,
});

export const setRequestSuccess = (data) => ({
  type: types.SET_REQUEST_SUCCESS,
  payload: data,
});
export const getRequestById = (data) => ({
  type: types.GET_REQUEST_BY_ID,
  payload: data,
});

export const setRequestByIdSuccess = (data) => ({
  type: types.SET_REQUEST_BY_ID_SUCCESS,
  payload: data,
});
export const getRequestByFilter = (data) => ({
  type: types.GET_REQUEST_BY_FILTER,
  payload: data,
});

export const setRequestByFilterSuccess = (data) => ({
  type: types.SET_REQUEST_BY_FILTER_SUCCESS,
  payload: data,
});

/**
 * CREATE_REQUEST
 */
export const createRequest = (data) => ({
  type: types.CREATE_REQUEST,
  payload: data,
});
/**
 * DELETE
 */
export const deleteRequest = (data) => ({
  type: types.DELETE_REQUEST,
  payload: data,
});
/**
 * UPDATE
 */
export const updateRequest = (data) => ({
  type: types.UPDATE_REQUEST,
  payload: data,
});
/**
 * CREATE_COMMENT
 */
export const createComment = (data) => ({
  type: types.CREATE_COMMENT,
  payload: data,
});
/**
 * LIST_COMMENT
 */
export const getListComment = (data) => ({
  type: types.GET_LIST_COMMENT,
  payload: data,
});

export const setListCommentSuccess = (data) => ({
  type: types.SET_LIST_COMMENT_SUCCESS,
  payload: data,
});
/**
 * HISTORY
 */
export const getHistoryRequest = (data) => ({
  type: types.GET_HISTORY_REQUEST,
  payload: data,
});

export const setHistoryRequestSuccess = (data) => ({
  type: types.SET_HISTORY_REQUEST_SUCCESS,
  payload: data,
});
