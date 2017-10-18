import { SIGN_OUT_SUCCESS } from './actionTypes';
import setAuthorizationToken from '../utils/setAuthorizationToken';

/**
 * Action dispatched to log the user out
 * @param {obj} payload
 * @return {obj} Returns empty object as payload
 */
export const signout = (payload) => {
  return {
    type: SIGN_OUT_SUCCESS,
    payload
  };
};

/**
 * Handles removing the token from the
 * localStorage to log the user out
 * @return {null} Returns a promise
 */
export const signOutRequest = () => {
  return (dispatch) => {
    localStorage.removeItem('token');
    setAuthorizationToken(false);
    dispatch(signout({}));
  };
};
