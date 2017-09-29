
import axios from 'axios';
import { GROUP_MESSAGE_SUCCESS, UPDATE_GROUP_INFO, VIEW_POST_SUCCESS, GROUP_MESSAGE_FAILURE } from './actionTypes';

export const fetchPost = (payload) => {
  return {
    type: GROUP_MESSAGE_SUCCESS,
    payload
  };
};

export const fetchPostFailure = (payload) => {
  return {
    type: GROUP_MESSAGE_FAILURE,
    payload
  };
};
export const updateGroupInfo = (payload) => {
  return {
    type: UPDATE_GROUP_INFO,
    payload
  };
};

export const viewPost = (payload) => {
  return {
    type: VIEW_POST_SUCCESS,
    payload
  };
};


export const fetchGroupPostRequest = (groupId) => {
  return (dispatch) => {
    return axios.get(`/api/v1/group/${groupId}/messages`)
    .then((response) => {
      const groupCreator = response.data.groupCreator;
      const { posts } = response.data,
        clicked = false;
      const result = {
        posts, groupCreator, clicked
      };
      if (posts.length > 0) {
        dispatch(fetchPost(result));
      } else {
        Materialize.toast('No message posted to this group yet', 2000, 'red white-text rounded');
        const error = {
          message: 'No message posted to this group yet'
        };
        dispatch(fetchPostFailure(error));
      }
    });
  };
};
export default fetchGroupPostRequest;
