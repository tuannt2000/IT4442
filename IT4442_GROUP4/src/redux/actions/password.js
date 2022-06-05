import * as types from '../constants/password';

export const postEmailForgot = (data, onSuccess, onError) => ({
  type: types.POST_EMAIL_FORGOT,
  payload: data,
  onSuccess,
  onError
});

export const putEmailReset = (data, onSuccess, onError) => ({
  type: types.PUT_EMAIL_RESET,
  payload: data,
  onSuccess,
  onError
});

export const putChangePassword = (data, onSuccess, onError) => ({
  type: types.PUT_CHANGE_PASSWORD,
  payload: data,
  onSuccess,
  onError
});
