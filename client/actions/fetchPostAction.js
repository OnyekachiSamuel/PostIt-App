import axios from 'axios';
import { FETCH_POST_SUCCESS } from './actionTypes';

/**
 *
 * @param {array} payload
 * @return {obj} Action to be dispatched if axios call to
 * fetch post is successful
 */
export const fetchPostSuccess = (payload) => {
  return {
    type: FETCH_POST_SUCCESS,
    payload
  };
};

/**
 *
 * @param {int} id
 * @param {int} userId
 * @return {promise} Makes an axios call to get messages
 * posted in a group. It dispatches a fetchPostSuccess action
 * on successful api call
 */
export const fetchPostRequest = (id, userId) => {
  const groupId = parseInt(id, 10);
  return (dispatch) => {
    return axios.get(`/api/v1/posts/${groupId}/${userId}`)
    .then((response) => {
      if (response.status === 200) {
        const { posts } = response.data;
        dispatch(fetchPostSuccess(posts));
      }
    });
  };
};
