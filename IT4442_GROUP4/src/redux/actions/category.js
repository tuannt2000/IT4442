import * as types from "../constants/category";

export const getListCategory = () => ({
  type: types.GET_LIST_CATEGORY,
});

export const setListCategorySuccess = (data) => ({
  type: types.SET_LIST_CATEGORY_SUCCESS,
  payload: data,
})
export const getCategory = (data) => ({
  type: types.GET_CATEGORY,
  payload: data
});

export const setCategorySuccess = (data) => ({
  type: types.SET_CATEGORY_SUCCESS,
  payload: data
});

export const postCategory = (data, onSuccess, onError) => ({
  type: types.POST_CATEGORY,
  payload: data,
  onSuccess,
  onError
});

export const putCategory = (data, onSuccess, onError) => ({
  type: types.PUT_CATEGORY,
  payload: data,
  onSuccess,
  onError
});

export const searchCategory = (data) =>({
  type: types.SEARCH_CATEGORY,
  payload: data
});

export const searchCategorySuccess = (data)=>({
  type: types.SEARCH_CATEGORY_SUCCESS,
  payload: data
});
