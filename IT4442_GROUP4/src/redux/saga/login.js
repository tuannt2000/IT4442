import { login, loginGoogle } from "../../services/login";
import { postEmailSuccess } from "../actions/login";
import { call, put, takeLatest } from "redux-saga/effects";
import { POST_EMAIL, POST_EMAIL_GOOGLE } from "../constants/login";

function* postEmail(action) {
  try {
    const res = yield call(login, action.payload);
    const { data } = res;
    if (data.code === 200) {
      localStorage.setItem("token", data.access_token);
      action.onSuccess(data.message);
      yield put(postEmailSuccess(data));
    } else {
      action.onError(data.message);
    }
  } catch (e) {
    action.onError(e.message);
  }
}

function* postEmailGoogle(action) {
  try {
    const response = yield call(loginGoogle, action.payload);
    const { data } = response;
    if (data.data.code === 200) {
      localStorage.setItem("token", data.data.access_token);
      action.onSuccess(data.data.message);
    } else {
      action.onError(data.data.message);
    }
  } catch (e) {
    action.onError(e.message);
  }
}

function* followLogin() {
  yield takeLatest(POST_EMAIL, postEmail);
  yield takeLatest(POST_EMAIL_GOOGLE, postEmailGoogle);
}

export default followLogin;
