import * as types from "../constants/category";

const initialState = {
  listCategory: [],
  detailCategory: {},
  list: {}
};

export const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_LIST_CATEGORY_SUCCESS:
      return {
        ...state,
        listCategory: [...action.payload],
      };
    case types.SET_CATEGORY_SUCCESS:
      return {
        ...state,
        list: { ...action.payload }
      };
      case types.SEARCH_CATEGORY_SUCCESS:
      return {
        ...state,
        list: { ...action.payload }
      };
    default:
      return state;
  }
}
