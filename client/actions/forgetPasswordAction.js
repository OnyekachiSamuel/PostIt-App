import axios from 'axios';
import { RESET_LINK_SUCCESS, RESET_LINK_FAILURE, PASSWORD_RESET_SUCCESS, PASSWORD_RESET_FAILURE } from './actionTypes';

export const sendResetLinkSuccess = (payload) => {
  return {
    type: RESET_LINK_SUCCESS,
    payload
  };
};

export const sendResetLinkFailure = (payload) => {
  return {
    type: RESET_LINK_FAILURE,
    payload
  };
};

export const passwordResetSuccess = (payload) => {
  return {
    type: PASSWORD_RESET_SUCCESS,
    payload
  };
};

export const passwordResetFailure = (payload) => {
  return {
    type: PASSWORD_RESET_FAILURE,
    payload
  };
};

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
