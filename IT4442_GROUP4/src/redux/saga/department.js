import { call, put, takeLatest } from "redux-saga/effects";
import {
  getDepartment,
  getListDepartment,
  postDepartment,
  putDepartment,
} from "../../services/department";
import { setDepartment, setListDepartment } from "../actions/department";
import {
  CREATE_DEPARTMENT,
  GET_DEPARTMENT,
  GET_LIST_DEPARTMENT,
  UPDATE_DEPARTMENT,
} from "../constants/department";
import { SUCCESS } from "../constants/status";

function* getDepartmentFollow(request) {
  try {
    const res = yield call(
      getDepartment,
      request.payload && request.payload.params
    );
    const { data } = res;
    yield put(setDepartment(data.data.data));
  } catch (error) { }
}

function* getListDepartmentFollow() {
  try {
    const res = yield call(getListDepartment);
    const { data } = res;
    yield put(setListDepartment(data.data.data));
  } catch (e) { }
}

function* createDepartmentFollow(request) {
  try {
    const res = yield call(postDepartment, request.payload.params);
    const { data } = res;
    if (data.data.code === SUCCESS) {
      request.payload.onSuccess(data.data.message);
    } else {
      request.payload.onError();
    }
  } catch (error) {
    request.payload.onError();
  }
}

function* updateDepartmentFollow(request) {
  try {
    const res = yield call(
      putDepartment,
      request.payload.id,
      request.payload.params
    );
    const { data } = res;
    if (data.data.code === SUCCESS) {
      request.payload.onSuccess(data.data.message);
    } else {
      request.payload.onError();
    }
  } catch (error) {
    request.payload.onError();
  }
}

function* followDepartment() {
  yield takeLatest(GET_DEPARTMENT, getDepartmentFollow);
  yield takeLatest(GET_LIST_DEPARTMENT, getListDepartmentFollow);
  yield takeLatest(CREATE_DEPARTMENT, createDepartmentFollow);
  yield takeLatest(UPDATE_DEPARTMENT, updateDepartmentFollow);
}

export default followDepartment;
