import { postEmailForgot, putEmailReset, putChangePassword } from '../../services/password';
import { call, takeLatest } from 'redux-saga/effects';
import { POST_EMAIL_FORGOT, PUT_EMAIL_RESET, PUT_CHANGE_PASSWORD } from '../constants/password';
import { SUCCESS } from '../../constants/category';

function* postEmailFollow(action) {
  try {
    const res = yield call(postEmailForgot, action.payload);
    const { data } = res;
    if (data.data.code === SUCCESS) {
      action.onSuccess(data.data.message);
    } else {
      action.onError(data.data.message);
    };
  } catch (e) {
    action.onError(e.message);
  }
};

function* putEmailFollow(action) {
  try {
    const res = yield call(putEmailReset, action.payload);
    const { data } = res;
    if (data.data.code === SUCCESS) {
      action.onSuccess(data.data.message);
    } else {
      action.onError(data.data.message);
    }
  } catch (e) {
    action.onError(e.message);
  }
};

function* putChangePassFollow(action) {
  try {
    const res = yield call(putChangePassword, action.payload);
    const { data } = res;
    if (data.data.code === SUCCESS) {
      action.onSuccess(data.data.message);
    } else {
      action.onError(data.data.message);
    }
  } catch (e) {
    action.onError(e.message);
  }
}

function* followPassword() {
  yield takeLatest(POST_EMAIL_FORGOT, postEmailFollow);
  yield takeLatest(PUT_EMAIL_RESET, putEmailFollow);
  yield takeLatest(PUT_CHANGE_PASSWORD, putChangePassFollow);
}

export default followPassword;