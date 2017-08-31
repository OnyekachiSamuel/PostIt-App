import axios from 'axios';
import jwt from 'jsonwebtoken';
import { GOOGLE_AUTH_SUCCESS, GOOGLE_AUTH_FAILURE } from './actionTypes';

export const googleAuthSuccess = (payload) => {
  return {
    type: GOOGLE_AUTH_SUCCESS,
    payload
  };
};

export const googleAuthFailure = (payload) => {
  return {
    type: GOOGLE_AUTH_FAILURE,
    payload
  };
};

export const googleAuthRequest = (userData) => {
  return (dispatch) => {
    return axios.post('/api/v1/auth/google', userData).then((response) => {
      console.log(response, '======user data=====');
      if (response.status === 200) {
        const {
          token
        } = response.data;
        window.localStorage.setItem('token', token);
        dispatch(googleAuthSuccess(jwt.decode(token)));
        location.href = '/group';
      }
    }).catch((error) => {
      const data = error.response.data;
      googleAuthFailure(data.message);
      Materialize.toast(data.message, 2000, 'red white-text rounded');
    });
  };
};