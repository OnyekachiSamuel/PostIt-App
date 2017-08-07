import axios from 'axios';
import { SIGN_OUT_SUCCESS } from './actionTypes';

const signout = (payload) => {
  return {
    type: SIGN_OUT_SUCCESS,
    payload
  };
};

export const signoutRequest = (payload) => {
  return (dispatch) => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('userId');
    dispatch(signout(payload));
  };
};
