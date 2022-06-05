import { call, put, takeLatest } from "@redux-saga/core/effects";
import { SUCCESS } from "../constants/status";
import {
  setHistoryRequestSuccess,
  setListCommentSuccess,
  setRequestByFilterSuccess,
  setRequestByIdSuccess,
  setRequestSuccess,
} from "../actions/request";
import {
  CREATE_COMMENT,
  CREATE_REQUEST,
  DELETE_REQUEST,
  GET_HISTORY_REQUEST,
  GET_LIST_COMMENT,
  GET_REQUEST,
  GET_REQUEST_BY_FILTER,
  GET_REQUEST_BY_ID,
  UPDATE_REQUEST,
} from "../constants/request";
import {
  deleteRequest,
  getCommentById,
  getHistoryRequest,
  getRequest,
  getRequestByFilter,
  getRequestById,
  postComment,
  postRequest,
  putRequest,
} from "../../services/request";

function* getRequestFollow(request) {
  try {
    const res = yield call(getRequest, request.payload.params);
    const { data } = res;
    yield put(setRequestSuccess(data?.data?.data));
    request.payload.onSuccess();
  } catch (error) {}
}

function* getRequestByFilterFollow(request) {
  try {
    const res = yield call(getRequestByFilter, request.payload.params);
    const { data } = res;
    yield put(setRequestByFilterSuccess(data?.data?.data));
    request.payload.onSuccess();
  } catch (error) {}
}

function* createRequestFollow(request) {
  try {
    const res = yield call(postRequest, request.payload.params);
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

function* deleteRequestFollow(request) {
  try {
    const res = yield call(deleteRequest, request.payload.id);
    const { data } = res;
    if (data.data.code === SUCCESS) {
      request.payload.onSuccess();
    } else {
      request.payload.onError();
    }
  } catch (error) {
    request.payload.onError();
  }
}

function* updateRequestFollow(request) {
  try {
    const res = yield call(
      putRequest,
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

function* getRequestByIdFollow(request) {
  try {
    const res = yield call(getRequestById, request.payload);
    const { data } = res;
    yield put(setRequestByIdSuccess(Object.values(data.data)[0]));

    request.payload.onError();
  } catch (error) {}
}

function* createCommentFollow(request) {
  try {
    const res = yield call(
      postComment,
      request.payload.id,
      request.payload.params
    );
    const { data } = res;
    if (data.data.code === SUCCESS) {
      request.payload.onSuccess({
        ...data.data.content,
        user: { ...data.data.user },
      });
    } else {
    }
  } catch (error) {}
}

function* getListCommentFollow(request) {
  try {
    const res = yield call(
      getCommentById,
      request.payload.id,
      request.payload.params
    );
    const { data } = res;
    yield put(setListCommentSuccess(data.data));
    request.payload.onSuccess();
  } catch (error) {}
}

function* getHistoryRequestFollow(request) {
  try {
    const res = yield call(
      getHistoryRequest,
      request.payload && request.payload.params
    );
    const { data } = res;
    yield put(setHistoryRequestSuccess(data.data));
  } catch (error) {}
}

function* followRequest() {
  yield takeLatest(GET_REQUEST, getRequestFollow);
  yield takeLatest(GET_REQUEST_BY_FILTER, getRequestByFilterFollow);
  yield takeLatest(CREATE_REQUEST, createRequestFollow);
  yield takeLatest(DELETE_REQUEST, deleteRequestFollow);
  yield takeLatest(UPDATE_REQUEST, updateRequestFollow);
  yield takeLatest(GET_REQUEST_BY_ID, getRequestByIdFollow);
  yield takeLatest(CREATE_COMMENT, createCommentFollow);
  yield takeLatest(GET_LIST_COMMENT, getListCommentFollow);
  yield takeLatest(GET_HISTORY_REQUEST, getHistoryRequestFollow);
}

export default followRequest;
