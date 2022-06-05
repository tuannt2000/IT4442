import { SET_SIZE_SCREEN, SET_STATUS_SIDEBAR } from "../constants/info";

const initialState = {
  statusSideBar: false,
  sizeScreen: {},
};

export const infoReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_STATUS_SIDEBAR:
      return {
        ...state,
        statusSideBar: action.payload,
      };

    case SET_SIZE_SCREEN:
      return {
        ...state,
        sizeScreen: action.payload,
      };

    default:
      return state;
  }
};
