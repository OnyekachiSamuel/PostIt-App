
import axios from 'axios';
import { GROUP_MESSAGE_SUCCESS } from './actionTypes';

const fetchPost = (payload) => {
  return {
    type: GROUP_MESSAGE_SUCCESS,
    payload
  };
};


const fetchGroupPostRequest = (groupId) => {
  return (dispatch) => {
    const token = localStorage.getItem('token');
    const config = { headers: {
      'x-access-token': token
    } };
    return axios.get(`/api/group/${groupId}/messages`)
    .then((payload) => {
      dispatch(fetchPost(payload.data));
    });
  };
};
export default fetchGroupPostRequest;
