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


export const userSignInRequest = (userData) => {
  return (dispatch) => {
    return axios.post('/api/v1/signin', userData).then((response) => {
      if (response.status === 200) {
        const {
          token
        } = response.data;
        dispatch(signIn(jwt.decode(token)));
        window.localStorage.setItem('token', token);
        location.href = '/group';
      }
    }).catch((error) => {
      const data = error.response.data;
      signInFailure(data.message);
      Materialize.toast(data.message, 2000, 'red white-text rounded');
    });
  };
};
