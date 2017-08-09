import { SIGN_UP_SUCCESS, SIGN_UP_FAILURE } from '../actions/actionTypes';
const initialState = {
  userData: {}
};

const signupReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGN_UP_SUCCESS:
      return Object.assign({},
        state, action.userData.data);
    case SIGN_UP_FAILURE:
      return state;
    default:
      return state;
  }
};
export default signupReducer;
