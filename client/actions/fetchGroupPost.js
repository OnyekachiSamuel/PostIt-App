
import axios from 'axios';
import { GROUP_MESSAGE_SUCCESS, UPDATE_GROUP_ID } from './actionTypes';

export const fetchPost = (payload) => {
  return {
    type: GROUP_MESSAGE_SUCCESS,
    payload
  };
};
export const updateGroupId = (payload) => {
  return {
    type: UPDATE_GROUP_ID,
    payload
  };
};


export const fetchGroupPostRequest = (groupId) => {
  return (dispatch) => {
    return axios.get(`/api/v1/group/${groupId}/messages`)
    .then((response) => {
      const groupCreator = response.data.groupCreator;
      const { data } = response.data;
      const result = {
        data, groupCreator
      };
      if (data.length > 0) {
        dispatch(fetchPost(result));
      } else {
        Materialize.toast('No message posted to this group yet', 2000, 'red white-text rounded');
      }
    });
  };
};
export default fetchGroupPostRequest;
