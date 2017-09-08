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

export const createGroupRequest = (groupData) => {
  return (dispatch) => {
    return axios.post('/api/v1/group', groupData).then((res) => {
      if (res.status === 200) {
        dispatch(createGroupSuccess(res.data.data));
      }
    }).catch((error) => {
      dispatch(createGroupFailure(error.response.data));
      throw error;
    });
  };
};
