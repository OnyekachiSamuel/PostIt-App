import axios from 'axios';
import { ADD_USER_SUCCESS, ADD_USER_FAILURE, RESET_COUNT } from './actionTypes';

export const addUserSuccess = (payload) => {
  return {
    type: ADD_USER_SUCCESS,
    payload
  };
};

export const resetCount = () => {
  return {
    type: RESET_COUNT
  };
};

export const addUserFailure = (payload) => {
  return {
    type: ADD_USER_FAILURE,
    payload
  };
};

export const addUserRequest = (userData, groupId) => {
  return (dispatch) => {
    return axios.post(`/api/v1/group/${groupId}/user`, userData).then((response) => {
      if (response.status === 200) {
        dispatch(addUserSuccess(response.data));
        Materialize.toast(response.data.message, 2000, 'green white-text rounded');
      }
    }).catch((error) => {
      dispatch(addUserFailure(error.response.data.message));
      Materialize.toast(error.response.data.message, 2000, 'red lighten-4 white-text rounded');
    });
  };
};
