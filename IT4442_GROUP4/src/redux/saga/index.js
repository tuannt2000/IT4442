import { all, call } from "redux-saga/effects";
import followLogin from "./login";
import followRequest from "./request";
import followCategory from "./category";
import followUser from "./user";
import followDepartment from "./department";
import followPassword from './password';

export default function* rootSaga() {
  yield all([
    call(followLogin),
    call(followRequest),
    call(followCategory),
    call(followUser),
    call(followDepartment),
    call(followPassword),
  ]);
}
