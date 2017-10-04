import { SIGN_UP_FAILURE, GOOGLE_AUTH_FAILURE, GROUP_CREATION_FAILURE } from '../actions/actionTypes';

const signupReducer = (state = {}, action) => {
  switch (action.type) {
    case SIGN_UP_FAILURE:
      return { ...state, ...action.payload };
    case GOOGLE_AUTH_FAILURE:
      return { ...state, ...action.payload };
    case GROUP_CREATION_FAILURE:
      return { ...state, ...action.errors };
    default:
      return state;
  }
};
export default signupReducer;
