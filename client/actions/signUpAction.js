import axios from 'axios';
import jwt from 'jsonwebtoken';
import { SIGN_UP_SUCCESS, SIGN_UP_FAILURE } from './actionTypes';

/**
 *
 * @param {obj} payload
 * @return {obj} Action dispatched when sign up operation
 * is successful
 */
export const signUp = (payload) => {
  return {
    type: SIGN_UP_SUCCESS,
    payload
  };
};

/**
 *
 * @param {obj} payload
 * @return {obj} Action dispatched when sign up operation fails
 */
export const signUpFailure = (payload) => {
  return {
    type: SIGN_UP_FAILURE,
    payload
  };
};

/**
 *
 * @param {obj} userData
 * @return {promise} Makes an axios call to create account for the user
 */
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
      dispatch(signUpFailure(data));
      Materialize.toast(data.message, 2000, 'red white-text rounded');
    });
  };
};
