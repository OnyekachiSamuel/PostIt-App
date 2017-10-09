import axios from 'axios';
import { FETCH_MEMBERS } from './actionTypes';

/**
 * @param {array} payload
 * @return {obj} Action dispatched when fetchMembersRequest
 * request is successful
 */
export const fetchMembers = (payload) => {
  return {
    type: FETCH_MEMBERS,
    payload
  };
};

/**
 * @param {int} groupId
 * @return {promise} Makes an axios call to fetch
 * members in a group. fetchMembers action is dispatched
 * if a success response is received.
 */
export const fetchMembersRequest = (groupId) => {
  return (dispatch) => {
    return axios.get(`/api/v1/group/${groupId}`).then((response) => {
      if (response.status === 200) {
        dispatch(fetchMembers(response.data));
      }
    });
  };
};
