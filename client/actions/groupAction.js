import axios from 'axios';
import { GROUP_CREATION_SUCCESS, GROUP_CREATION_FAILURE, FETCH_USERS_ID, GROUP_MEMBERS_UPDATE } from './actionTypes';

export const createGroupSuccess = (payload) => {
  return {
    type: GROUP_CREATION_SUCCESS,
    payload
  };
};

export const createGroupFailure = (errors) => {
  return {
    type: GROUP_CREATION_FAILURE,
    errors
  };
};

export const getMembers = (payload) => {
  return {
    type: FETCH_USERS_ID,
    payload
  };
};

export const updateGroupMembers = (payload) => {
  return {
    type: GROUP_MEMBERS_UPDATE,
    payload
  };
};

export const createGroup = (groupDetails) => {
  return (dispatch) => {
    return axios.post('/api/v1/group', groupDetails).then((res) => {
      if (res.status === 200) {
        dispatch(createGroupSuccess(res.data.group));
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
        const { groupMembers } = response.data;
        dispatch(getMembers(groupMembers));
      }
    });
  };
};
