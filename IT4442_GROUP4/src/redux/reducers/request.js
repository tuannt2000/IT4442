import * as types from "../constants/request";

const initialState = {
  listRequest: {},
  detailRequest: {},
};

export const requestReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_REQUEST_SUCCESS:
      return {
        ...state,
        listRequest: { ...action.payload },
      };

    case types.SET_REQUEST_BY_FILTER_SUCCESS:
      return {
        ...state,
        listRequest: { ...action.payload },
      };

    case types.SET_REQUEST_BY_ID_SUCCESS:
      return {
        ...state,
        detailRequest: { ...action.payload },
      };

    case types.SET_HISTORY_REQUEST_SUCCESS:
      return {
        ...state,
        historyRequest: { ...action.payload },
      };

    case types.SET_LIST_COMMENT_SUCCESS:
      return {
        ...state,
        listComment: { ...action.payload },
      };

    default:
      return state;
  }
};
