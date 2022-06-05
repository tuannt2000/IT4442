import { call, put, takeLatest, delay } from "@redux-saga/core/effects";
import { getCategory, getListCategory, putCategory, postCategory, searchCategory } from "../../services/category";
import { setListCategorySuccess, setCategorySuccess, searchCategorySuccess } from "../actions/category";
import { GET_CATEGORY, GET_LIST_CATEGORY, PUT_CATEGORY, POST_CATEGORY, SEARCH_CATEGORY } from "../constants/category";
import { SUCCESS } from '../../constants/category';

function* getCategoryFollow() {
  try {
    const res = yield call(getListCategory);
    const { data } = res;
    yield put(setListCategorySuccess(data.data.data));
  } catch (error) { }
}

function* getListCategoryFollow(action) {
  try {
    const response = yield call(getCategory, action.payload && action.payload);
    const { data } = response;
    yield put(setCategorySuccess(data.data));
  } catch (e) { }
}

function* postCategoryFollow(action) {
  try {
    const response = yield call(postCategory, action.payload);
    const { data } = response;
    if (data.data.code === SUCCESS) {
      action.onSuccess(data.data.message);
    } else {
      action.onError(data.data.message);
    }
  } catch (e) { }
}

function* putCategoryFollow(action) {
  try {
    const response = yield call(
      putCategory,
      action.payload.id,
      action.payload.data
    );
    const { data } = response;
    if (data.data.code === SUCCESS) {
      action.onSuccess(data.data.message);
    } else {
      action.onError(data.data.message);
    }
  } catch (e) {
    action.onError(e.message);
  }
}

function* searchCategoryFollow(action) {
  try {
    yield delay(300);
    const response = yield call(searchCategory, action.payload && action.payload);
    const { data } = response;
    if (data.data.code === SUCCESS) {
      yield put(searchCategorySuccess(data.data));
    }
  } catch (e) { }
}

function* followCategory() {
  yield takeLatest(GET_CATEGORY, getListCategoryFollow);
  yield takeLatest(GET_LIST_CATEGORY, getCategoryFollow);
  yield takeLatest(POST_CATEGORY, postCategoryFollow)
  yield takeLatest(PUT_CATEGORY, putCategoryFollow);
  yield takeLatest(SEARCH_CATEGORY, searchCategoryFollow);
}

export default followCategory;
