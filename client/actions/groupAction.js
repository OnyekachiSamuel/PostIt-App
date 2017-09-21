import axios from 'axios';
import { GROUP_CREATION_SUCCESS, GROUP_CREATION_FAILURE, FETCH_USERS_ID } from './actionTypes';

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

export const getUserIds = (payload) => {
  return {
    type: FETCH_USERS_ID,
    payload
  };
};

export const createGroupRequest = (groupData) => {
  return (dispatch) => {
    return axios.post('/api/v1/group', groupData).then((res) => {
      if (res.status === 200) {
        dispatch(createGroupSuccess(res.data.data));
      }
    }).catch((error) => {
      dispatch(createGroupFailure(error.response.data.message));
      Materialize.toast(error.response.data.message, 2000, 'red white-text rounded');
    });
  };
};


export const fetchGroupUsers = (groupId) => {
  return (dispatch) => {
    return axios.post(`/api/v1/group/${groupId}/userIds`).then((response) => {
      if (response.status === 200) {
        const { userIds } = response.data;
        const filterResult = [];
        userIds.forEach((user) => {
          filterResult.push(user.userId);
        });
        dispatch(getUserIds(filterResult));
      }
    });
  };
};
