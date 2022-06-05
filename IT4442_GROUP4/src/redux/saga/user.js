import { call, put, takeLatest, delay } from "@redux-saga/core/effects";
import {
  getListUser,
  getListAssignee,
  getUsers,
  postUser,
  searchUser,
  putUser,
  getCurrentUser,
} from "../../services/user";
import {
  setListAssigneeSuccess,
  setListUserSuccess,
  getUserSuccess,
  searchUserSuccess,
  setCurrentUserSuccess,
} from "../actions/user";
import {
  GET_LIST_USER,
  GET_LIST_ASSIGNEE,
  GET_USER,
  POST_USER,
  PUT_USER,
  SEARCH_USER,
  GET_CURRENT_USER,
} from "../constants/user";
import { SUCCESS, ERROR_404 } from "../../constants/user";

function* getListUserFollow() {
  try {
    const res = yield call(getListUser);
    const { data } = res;
    yield put(setListUserSuccess(data.data));
  } catch (error) {}
}

function* getListAssigneeFollow() {
  try {
    const res = yield call(getListAssignee);
    const { data } = res;
    yield put(setListAssigneeSuccess(data.data));
  } catch (error) {}
}

function* getUserFollow(action) {
  try {
    const response = yield call(getUsers, action.payload);
    const { data } = response;
    yield put(getUserSuccess(data.data));
  } catch (e) {}
}

function* postUserFollow(action) {
  try {
    const response = yield call(postUser, action.payload);
    const { data } = response;
    if (data.data.code === SUCCESS) {
      action.onSuccess(data.data.message);
    } else {
      action.onError(data.data.message);
    }
  } catch (e) {
    action.onError("The email has already been taken!");
  }
}

function* putUserFollow(action) {
  try {
    const response = yield call(
      putUser,
      action.payload.id,
      action.payload.data
    );
    const { data } = response;
    if (data.data.code === SUCCESS) {
      action.onSuccess("Update success!");
    } else if (data.code === ERROR_404) {
      action.onError(data.message);
    } else {
      action.onError(data.data.message);
    }
  } catch (e) {
    action.onError(e.message);
  }
}

function* searchUserFollow(action) {
  try {
    yield delay(300);
    const response = yield call(searchUser, action.payload);
    const { data } = response;
    if (data.code === SUCCESS) {
      yield put(searchUserSuccess(data.data));
    } else {
      yield put(searchUserSuccess({ data: [] }));
    }
  } catch (e) {}
}

function* getCurrentUserFollow() {
  try {
    const res = yield call(getCurrentUser);
    const { data } = res;
    yield put(setCurrentUserSuccess(data.data));
  } catch (error) {}
}

function* followUser() {
  yield takeLatest(GET_LIST_USER, getListUserFollow);
  yield takeLatest(GET_LIST_ASSIGNEE, getListAssigneeFollow);
  yield takeLatest(GET_USER, getUserFollow);
  yield takeLatest(POST_USER, postUserFollow);
  yield takeLatest(PUT_USER, putUserFollow);
  yield takeLatest(SEARCH_USER, searchUserFollow);
  yield takeLatest(GET_CURRENT_USER, getCurrentUserFollow);
}

export default followUser;
