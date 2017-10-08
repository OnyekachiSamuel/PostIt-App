import axios from 'axios';
import jwt from 'jsonwebtoken';
import { SIGN_IN_SUCCESS, SIGN_IN_FAILURE } from './actionTypes';

/**
 *
 * @param {obj} payload
 * @return {obj} Action dispatched when sign in action
 * is successful
 */
export const signIn = (payload) => {
  return {
    type: SIGN_IN_SUCCESS,
    payload
  };
};

/**
 *
 * @param {obj} payload
 * @return {obj} Action dispatched when sign in operation fails
 */
export const signInFailure = (payload) => {
  return {
    type: SIGN_IN_FAILURE,
    payload
  };
};

/**
 *
 * @param {obj} userData
 * @return {promise} Makes an axios call to authenticate the user and log the
 * user in
 */
export const userSignInRequest = (userData) => {
  return (dispatch) => {
    return axios.post('/api/v1/signin', userData).then((response) => {
      const {
          token
        } = response.data;
      if (response.status === 200 && token) {
        dispatch(signIn(jwt.decode(token)));
        window.localStorage.setItem('token', token);
        location.href = '/group';
      }
    }).catch((error) => {
      const data = error.response.data;
      dispatch(signInFailure(data.message));
      Materialize.toast(data.message, 2000, 'red white-text rounded');
    });
  };
};
