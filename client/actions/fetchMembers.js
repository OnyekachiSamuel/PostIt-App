import axios from 'axios';
import { FETCH_MEMBERS } from './actionTypes';

const fetchMembers = (payload) => {
  return {
    type: FETCH_MEMBERS,
    payload
  };
};


export const fetchMembersRequest = (groupId) => {
  return (dispatch) => {
    return axios.get(`/api/group/${groupId}`).then((payload) => {
      if (payload.data.status === 'success') {
        dispatch(fetchMembers(payload.data));
      }
    });
  };
};
