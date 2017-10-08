import axios from 'axios';
import { RESET_LINK_SUCCESS, RESET_LINK_FAILURE, PASSWORD_RESET_SUCCESS, PASSWORD_RESET_FAILURE } from './actionTypes';

/**
 *
 * @param {obj} payload
 * @return {obj} Action to dispatch when a user requests
 * for password reset. The payload is a success message
 * telling the user to check his email
 */
export const sendResetLinkSuccess = (payload) => {
  return {
    type: RESET_LINK_SUCCESS,
    payload
  };
};

/**
 *
 * @param {obj} payload
 * @return {obj} Action dispatched if error occured.
 * The payload is the error response message
 */
export const sendResetLinkFailure = (payload) => {
  return {
    type: RESET_LINK_FAILURE,
    payload
  };
};

/**
 *
 * @param {obj} payload
 * @return {obj} Action dispatched when password reset
 * is successful. Payload is a success message telling the user
 * to login with new password
 */
export const passwordResetSuccess = (payload) => {
  return {
    type: PASSWORD_RESET_SUCCESS,
    payload
  };
};

/**
 *
 * @param {obj} payload
 * @return {obj} Action dispatched if the password
 * reset process fails. The payload contains the error message
 */
export const passwordResetFailure = (payload) => {
  return {
    type: PASSWORD_RESET_FAILURE,
    payload
  };
};

/**
 *
 * @param {obj} userEmail
 * @return {promise} Makes an axios call to send a user a password
 * reset link via email
 */
export const forgetPasswordRequest = (userEmail) => {
  return (dispatch) => {
    return axios.post('/api/v1/forgot', userEmail).then((response) => {
      if (response.status === 200) {
        dispatch(sendResetLinkSuccess(response.data.message));
      }
    }).catch((error) => {
      dispatch(sendResetLinkFailure(error.response.data.message));
    });
  };
};

/**
 *
 * @param {string} token
 * @param {obj} userDetail
 * @return {promise} Makes an axios call to reset the users
 * password
 */
export const resetPasswordRequest = (token, userDetail) => {
  return (dispatch) => {
    return axios.put(`/api/v1/reset/${token}`, userDetail).then((response) => {
      if (response.status === 200) {
        dispatch(passwordResetSuccess(response.data.message));
      }
    }).catch((error) => {
      dispatch(passwordResetFailure(error.response.data.message));
    });
  };
};
