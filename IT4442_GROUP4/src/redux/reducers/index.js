import { combineReducers } from "redux";
import { categoryReducer } from "./category";
import { loginReducer } from "./login";
import { requestReducer } from "./request";
import { userReducer } from "./user";
import { departmentReducer } from "./department";
import { infoReducer } from "./info";

const rootReducer = combineReducers({
  emailLogin: loginReducer,
  request: requestReducer,
  user: userReducer,
  category: categoryReducer,
  department: departmentReducer,
  info: infoReducer,
});

export default rootReducer;
