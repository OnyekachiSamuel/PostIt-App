import axios from 'axios';
import jwt from 'jsonwebtoken';
import { GOOGLE_AUTH_SUCCESS, GOOGLE_AUTH_FAILURE } from './actionTypes';

/**
 * @param {obj} payload
 * @return {obj} Action dispatched when signup with
 * google is successful
 */
export const googleAuthSuccess = (payload) => {
  return {
    type: GOOGLE_AUTH_SUCCESS,
    payload
  };
};

/**
 *
 * @param {obj} payload
 * @return {obj} Action dispatched when signup with
 * google fails
 */
export const googleAuthFailure = (payload) => {
  return {
    type: GOOGLE_AUTH_FAILURE,
    payload
  };
};

/**
 *
 * @param {obj} userData
 * @return {promise} Makes an axios call when a user tries to
 * signup or signin with google authentication
 */
export const googleAuthRequest = (userData) => {
  return (dispatch) => {
    return axios.post('/api/v1/auth/google', userData).then((response) => {
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
      dispatch(googleAuthFailure(data.message));
      Materialize.toast(error.response.data.message, 2500, 'red white-text rounded');
    });
  };
};
