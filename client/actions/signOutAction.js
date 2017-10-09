import { SIGN_OUT_SUCCESS } from './actionTypes';
import setAuthorizationToken from '../utils/setAuthorizationToken';

/**
 *
 * @param {obj} payload
 * @return {obj} Action dispatched to log the user out
 */
export const signout = (payload) => {
  return {
    type: SIGN_OUT_SUCCESS,
    payload
  };
};

/**
 * @return {null} Handles removing the token from the
 * localStorage to log the user out
 */
export const signOutRequest = () => {
  return (dispatch) => {
    localStorage.removeItem('token');
    setAuthorizationToken(false);
    dispatch(signout({}));
  };
};
