import axios from 'axios';
import { FETCH_MEMBERS } from './actionTypes';

export const fetchMembers = (payload) => {
  return {
    type: FETCH_MEMBERS,
    payload
  };
};


export const fetchMembersRequest = (groupId) => {
  return (dispatch) => {
    return axios.get(`/api/v1/group/${groupId}`).then((response) => {
      if (response.status === 200) {
        dispatch(fetchMembers(response.data));
      }
    });
  };
};
