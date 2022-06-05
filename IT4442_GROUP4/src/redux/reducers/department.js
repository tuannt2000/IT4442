import * as types from "../constants/department";

const initialState = {
  department: {},
  listDepartments: [],
};

export const departmentReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_DEPARTMENT:
      return { ...state, department: { ...action.payload } };

    case types.SET_LIST_DEPARTMENT:
      return { ...state, listDepartments: [...action.payload] };

    default:
      return state;
  }
};
