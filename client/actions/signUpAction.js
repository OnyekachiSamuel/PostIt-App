import axios from 'axios';
import jwt from 'jsonwebtoken';
import { SIGN_UP_SUCCESS, SIGN_UP_FAILURE } from './actionTypes';

export const signUp = (payload) => {
  return {
    type: SIGN_UP_SUCCESS,
    payload
  };
};
export const signUpFailure = (payload) => {
  return {
    type: SIGN_UP_FAILURE,
    payload
  };
};

export const userSignUpRequest = (userData) => {
  return (dispatch) => {
    return axios.post('/api/v1/signup', userData).then((response) => {
      if (response.status === 200) {
        const {
          token
        } = response.data;
        dispatch(signUp(jwt.decode(token)));
        localStorage.setItem('token', token);
        location.href = '/group';
      }
    }).catch((error) => {
      const data = error.response.data;
      console.log(data, '====data====');
      dispatch(signUpFailure(data));
      Materialize.toast(data.message, 2000, 'red white-text rounded');
    });
  };
};
