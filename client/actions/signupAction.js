import axios from 'axios';
import jwt from 'jsonwebtoken';
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
        dispatch(signUp(jwt.decode(payload.data.token)));
        localStorage.setItem('token', payload.data.token);
        localStorage.setItem('username', payload.data.data.username);
        location.href = '/group';
      }
    }).catch((error) => {
      dispatch(signupFailure(error.response.data.message));
      Materialize.toast(error.response.data.message, 2000, 'green');
      throw error;
    });
  };
};
