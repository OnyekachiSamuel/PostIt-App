import axios from 'axios';
import { POST_MESSAGE_SUCCESSFUL, POST_MESSAGE_FAILURE } from './actionTypes';


/**
 * Action dispatched when message post
 * is successful
 * @param {obj} payload
 * @return {obj} Returns object containing user message
 */
export const postedMessage = (payload) => {
  return {
    type: POST_MESSAGE_SUCCESSFUL,
    payload
  };
};

/**
 * Action dispatched when message posting fails
 * @param {obj} payload
 * @return {obj} Returns object containing failure
 * message payload
 */
export const postedMessageFailure = (payload) => {
  return {
    type: POST_MESSAGE_FAILURE,
    payload
  };
};

/**
 * Makes an axios call to create a post in a group
 * @param {obj} messageContent
 * @param {int} groupId
 * @return {obj} Returns a promise
 */
export const postRequest = (messageContent, groupId) => {
  return (dispatch) => {
    return axios.post(`/api/v1/group/${groupId}/messages`, messageContent).then((response) => {
      if (response.status === 200) {
        const { post } = response.data;
        dispatch(postedMessage(post));
      }
    }).catch((error) => {
      dispatch(postedMessageFailure(error.response.data.errors.message));
      Materialize.toast(error.response.data.errors.message, 2500, 'red white-text rounded');
    });
  };
};
