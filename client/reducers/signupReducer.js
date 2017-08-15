import { SIGN_UP_FAILURE } from '../actions/actionTypes';

const signupReducer = (state = {}, action) => {
  switch (action.type) {
    case SIGN_UP_FAILURE:
      return Object.assign({}, state, action.userData);
    default:
      return state;
  }
};
export default signupReducer;
