import axios from 'axios';
import { POST_MESSAGE_SUCCESSFUL, POST_MESSAGE_FAILURE } from './actionTypes';


/**
 *
 * @param {obj} payload
 * @return {obj} Action dispatched when message post
 * is successful
 */
export const postedMessage = (payload) => {
  return {
    type: POST_MESSAGE_SUCCESSFUL,
    payload
  };
};

/**
 *
 * @param {obj} payload
 * @return {obj} Action dispatched when message posting fails
 */
export const postedMessageFailure = (payload) => {
  return {
    type: POST_MESSAGE_FAILURE,
    payload
  };
};

/**
 *
 * @param {obj} messageContent
 * @param {int} groupId
 * @return {obj} Makes an axios call to create a post in a group
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
