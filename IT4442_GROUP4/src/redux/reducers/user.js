import * as types from "../constants/user";

const initialState = {
  user: {},
  listUser: [],
  listAssignee: [],
  detailUser: {},
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_LIST_USER_SUCCESS:
      return { ...state, listUser: [...action.payload] };

    case types.SET_LIST_ASSIGNEE_SUCCESS:
      return { ...state, listAssignee: [...action.payload] };

    case types.SET_USER_SUCCESS:
      return {
        ...state,
        user: { ...action.payload },
      };
    case types.SEARCH_USER_SUCCESS:
      return {
        ...state,
        user: { ...action.payload },
      };

    case types.SET_CURRENT_USER_SUCCESS:
      return { ...state, currentUser: { ...action.payload } };

    default:
      return state;
  }
};
