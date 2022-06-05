import * as types from '../constants/login';

const initalState = {
  data: {},
};

export const loginReducer = (state = initalState, action) => {
  switch (action.type) {
    case types.POST_EMAIL_SUCCESS:
      return {
        ...state,
        data: action.payload
      }
    default:
      return state;
  }
}