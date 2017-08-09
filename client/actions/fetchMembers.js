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
    const token = localStorage.getItem('token');
    const config = { headers: {
      'x-access-token': token
    } };
    return axios.get(`http://localhost:3000/api/group/${groupId}`).then((payload) => {
      if (payload.data.status === 'success') {
        dispatch(fetchMembers(payload.data));
      }
    });
  };
};
