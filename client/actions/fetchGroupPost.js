
import axios from 'axios';
import { GROUP_MESSAGE_SUCCESS, UPDATE_GROUP_INFO, VIEW_POST_SUCCESS, GROUP_MESSAGE_FAILURE } from './actionTypes';

/**
 * @param {obj} payload
 * @return {obj} Action to dispatch for a successful message fetch.
 * Payload is an object containing array of fetched messages
 */
export const fetchPost = (payload) => {
  return {
    type: GROUP_MESSAGE_SUCCESS,
    payload
  };
};

/**
 * @return {obj} Action dispatched when no message is fetched.
 * Payload here is the error message.
 * @param {string} payload
 */
export const fetchPostFailure = (payload) => {
  return {
    type: GROUP_MESSAGE_FAILURE,
    payload
  };
};

/**
 * @param {obj} payload
 * @return {obj} Action to be dispatched on mounting PostedMessage component
 * The payload is an object containing the groupId and groupName
 */
export const updateGroupInfo = (payload) => {
  return {
    type: UPDATE_GROUP_INFO,
    payload
  };
};

/**
 * @param {obj} payload
 * @return {obj} Action to be dispatched when a user clicks
 * the view button in the messageBoard page
 */
export const viewPost = (payload) => {
  return {
    type: VIEW_POST_SUCCESS,
    payload
  };
};

/**
 * @param {int} groupId
 * @return {promise} Makes an axios call and dispatches a fetchPost action
 * if a message is fetched from the axios call or dispatches a fetchPostFailure
 * if no message is fetched from the axios call
 */
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
        const error = {
          message: 'No message posted to this group yet'
        };
        dispatch(fetchPostFailure(error));
      }
    });
  };
};
export default fetchGroupPostRequest;
