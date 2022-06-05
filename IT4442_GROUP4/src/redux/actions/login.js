import * as types from '../constants/login';

export const postEmail = (data, onSuccess, onError)=> ({
  type:types.POST_EMAIL,
  payload: data,
  onSuccess,
  onError
});

export const postEmailSuccess =(data)=>({
  type:types.POST_EMAIL_SUCCESS,
  payload:data
});

export const postEmailGoogle = (data, onSuccess, onError) => ({
  type: types.POST_EMAIL_GOOGLE,
  payload: data,
  onSuccess,
  onError
});
