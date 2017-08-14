import axios from 'axios';
import jwt from 'jsonwebtoken';
import { SIGN_IN_SUCCESS, SIGN_IN_FAILURE } from './actionTypes';

export const signIn = (payload) => {
  return {
    type: SIGN_IN_SUCCESS,
    payload
  };
};

export const signInFailure = (payload) => {
  return {
    type: SIGN_IN_FAILURE,
    payload
  };
};


export const userSigninRequest = (userData) => {
  return (dispatch) => {
    return axios.post('/api/signin', userData).then((payload) => {
      if (payload.data.status === 'success') {
        window.localStorage.setItem('token', payload.data.token);
        window.localStorage.setItem('username', payload.data.data.username);
        window.localStorage.setItem('userId', payload.data.data.userId);
        dispatch(signIn(jwt.decode(payload.data.token)));
        location.href = '/group';
      } else if (payload.data.status === 'failed') {
        dispatch(signInFailure(payload.data.message));
        Materialize.toast(payload.data.message, 2000, 'green white-text rounded');
      }
    });
  };
};
