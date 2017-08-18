import axios from 'axios';
import jwt from 'jsonwebtoken';
import { SIGN_UP_SUCCESS, SIGN_UP_FAILURE } from './actionTypes';

export const signUp = (payload) => {
  return {
    type: SIGN_UP_SUCCESS,
    payload
  };
};
export const signupFailure = (payload) => {
  return {
    type: SIGN_UP_FAILURE,
    payload
  };
};

export const userSignupRequest = (userData) => {
  return (dispatch) => {
    return axios.post('/api/signup', userData).then((payload) => {
      if (payload.data.status === 'success') {
        dispatch(signUp(jwt.decode(payload.data.token)));
        localStorage.setItem('token', payload.data.token);
        localStorage.setItem('username', payload.data.data.username);
        location.href = '/group';
      } else if (payload.data.status === 'failed') {
        dispatch(signupFailure(payload.data.data));
        Materialize.toast(payload.data.message, 2000, 'green');
      }
    });
  };
};
