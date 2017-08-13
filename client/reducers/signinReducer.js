import isEmpty from 'lodash/isEmpty';
import { SIGN_IN_SUCCESS, SIGN_OUT_SUCCESS, SIGN_UP_SUCCESS } from '../actions/actionTypes';


const initialState = {
  isAuthenticated: false,
  user: {}
};


const signinReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGN_IN_SUCCESS:
      return {
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      };
    case SIGN_UP_SUCCESS:
      return {
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      };
    case SIGN_OUT_SUCCESS:
      return {
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      };
    default:
      return state;
  }
};

export default signinReducer;
