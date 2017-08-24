import axios from 'axios';
import { FETCH_USER_GROUPS } from './actionTypes';

export const fetchUserGroups = (payload) => {
  return {
    type: FETCH_USER_GROUPS,
    payload
  };
};


export const fetchUserGroupRequest = (userId) => {
  return (dispatch) => {
    return axios.get(`/api/v1/groups/user/${userId}`).then((response) => {
      dispatch(fetchUserGroups(response.data));
    });
  };
};
