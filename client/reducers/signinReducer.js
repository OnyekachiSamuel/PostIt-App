import { SET_CURRENT_USER, SIGN_OUT_SUCCESS } from '../actions/actionTypes';

const initialState = {
  isLoggedOut: true,
  user: {},
  isAuthenticated: false,
};


const signinReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return Object.assign({}, state, {
        isLoggedOut: false,
        isAuthenticated: !(Object.keys(action.payload).length === 0),
        user: action.payload
      });
    case SIGN_OUT_SUCCESS:
      return Object.assign({}, state, { isLoggedOut: true });
    default:
      return state;
  }
};

export default signinReducer;
