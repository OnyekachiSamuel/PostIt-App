import { SIGN_OUT_SUCCESS } from './actionTypes';
import setAuthorizationToken from '../utils/setAuthorizationToken';

export const signout = (payload) => {
  return {
    type: SIGN_OUT_SUCCESS,
    payload
  };
};

export const signoutRequest = () => {
  return (dispatch) => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('userId');
    setAuthorizationToken(false);
    dispatch(signout({}));
  };
};
