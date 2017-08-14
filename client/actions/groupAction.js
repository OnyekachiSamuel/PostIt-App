import axios from 'axios';
import { GROUP_CREATION_SUCCESS, GROUP_CREATION_FAILURE } from './actionTypes';

export const createGroupSuccess = (userData) => {
  return {
    type: GROUP_CREATION_SUCCESS,
    userData
  };
};

export const createGroupFailure = (errors) => {
  return {
    type: GROUP_CREATION_FAILURE,
    errors
  };
};

export const createRequest = (userData) => {
  return (dispatch) => {
    return axios.post('/api/group', userData).then((res) => {
      if (res.data.status === 'success') {
        dispatch(createGroupSuccess(res.data.data));
      }
    }).catch((error) => {
      dispatch(createGroupFailure(error.response.data));
      Materialize.toast(error.response.data.message, 2000, 'green white-text rounded');
      throw error;
    });
  };
};
