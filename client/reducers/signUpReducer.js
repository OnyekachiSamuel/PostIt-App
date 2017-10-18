import { SIGN_UP_FAILURE, GOOGLE_AUTH_FAILURE, GROUP_CREATION_FAILURE } from '../actions/actionTypes';

/**
 * This reducer updates the state with
 * the details of the user that created a new account.
 * @param {obj} state
 * @param {obj} action
 * @return {obj} Here the state is reduced based on the action object and
 *  a new start returned
 */
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
