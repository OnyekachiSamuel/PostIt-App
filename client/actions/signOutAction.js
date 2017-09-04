import { SIGN_OUT_SUCCESS } from './actionTypes';
import setAuthorizationToken from '../utils/setAuthorizationToken';

export const signout = (payload) => {
  return {
    type: SIGN_OUT_SUCCESS,
    payload
  };
};

export const signOutRequest = () => {
  return (dispatch) => {
    localStorage.removeItem('token');
    setAuthorizationToken(false);
    dispatch(signout({}));
  };
};
