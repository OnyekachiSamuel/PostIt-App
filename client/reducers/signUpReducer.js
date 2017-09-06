import { SIGN_UP_FAILURE, GOOGLE_AUTH_FAILURE } from '../actions/actionTypes';

const signupReducer = (state = {}, action) => {
  switch (action.type) {
    case SIGN_UP_FAILURE:
      console.log(action.payload, 'action');
      return { ...state, ...action.payload };
    case GOOGLE_AUTH_FAILURE:
      return Object.assign({}, state, action.payload);
    default:
      return state;
  }
};
export default signupReducer;
