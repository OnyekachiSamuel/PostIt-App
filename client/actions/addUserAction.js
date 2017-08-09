import axios from 'axios';
import { ADD_USER_SUCCESS, ADD_USER_FAILURE } from './actionTypes';

const addUserSuccess = (payload) => {
  return {
    type: ADD_USER_SUCCESS,
    payload
  };
};

const addUserFailure = (payload) => {
  return {
    type: ADD_USER_FAILURE,
    payload
  };
};

export const addUserRequest = (userData, groupId) => {
  return (dispatch) => {
    return axios.post(`/api/group/${groupId}/user`, userData).then((payload) => {
      if (payload.data.status === 'success') {
        dispatch(addUserSuccess(payload.data.data));
        Materialize.toast(payload.data.message, 2000, 'green white-text rounded');
      } else if (payload.data.status === 'failed') {
        dispatch(addUserFailure(payload.data.data));
        Materialize.toast(payload.data.message, 2000, 'green white-text rounded');
      }
    });
  };
};

