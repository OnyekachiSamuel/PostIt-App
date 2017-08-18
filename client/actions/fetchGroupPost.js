
import axios from 'axios';
import { GROUP_MESSAGE_SUCCESS } from './actionTypes';

export const fetchPost = (payload) => {
  return {
    type: GROUP_MESSAGE_SUCCESS,
    payload
  };
};


export const fetchGroupPostRequest = (groupId) => {
  return (dispatch) => {
    return axios.get(`/api/group/${groupId}/messages`)
    .then((payload) => {
      dispatch(fetchPost(payload.data));
    });
  };
};
export default fetchGroupPostRequest;
