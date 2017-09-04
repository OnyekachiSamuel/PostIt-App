
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
    return axios.get(`/api/v1/group/${groupId}/messages`)
    .then((response) => {
      const { data } = response.data;
      if (data.length > 0) {
        dispatch(fetchPost(response.data));
      } else {
        Materialize.toast('No message posted to this group yet', 2000, 'yellow white-text rounded');
      }
    });
  };
};
export default fetchGroupPostRequest;
