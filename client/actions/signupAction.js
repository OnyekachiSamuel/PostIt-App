import axios from 'axios';
import { SIGN_UP_SUCCESS, SIGN_UP_FAILURE } from './actionTypes';

export const signUp = (userData) => {
  return {
    type: SIGN_UP_SUCCESS,
    userData
  };
};
export const signupFailure = (userData) => {
  return {
    type: SIGN_UP_FAILURE,
    userData
  };
};

export const userSignupRequest = (userData) => {
  return (dispatch) => {
    return axios.post('/api/signup', userData).then((payload) => {
      if (payload.data.status === 'success') {
        dispatch(signUp(payload.data.token));
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
