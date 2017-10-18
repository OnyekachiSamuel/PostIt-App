import isEmpty from 'lodash/isEmpty';
import { SIGN_IN_SUCCESS, SIGN_OUT_SUCCESS, SIGN_UP_SUCCESS, GOOGLE_AUTH_SUCCESS } from '../actions/actionTypes';


const initialState = {
  isAuthenticated: false,
  user: {}
};

/**
 * This reducer updates the state with
 * the login detail of the user
 * @param {obj} state
 * @param {obj} action
 * @return {obj} Here the state is reduced based on the action object and
 *  a new start returned
 */
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
    case GOOGLE_AUTH_SUCCESS:
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
