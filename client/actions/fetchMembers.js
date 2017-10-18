import axios from 'axios';
import { FETCH_MEMBERS } from './actionTypes';

/**
 * Action dispatched when fetchMembersRequest
 * request is successful
 * @param {array} payload
 * @return {obj} Returns object with array of members payload
 */
export const fetchMembers = (payload) => {
  return {
    type: FETCH_MEMBERS,
    payload
  };
};

/**
 * Makes an axios call to fetch
 * members in a group. fetchMembers action is dispatched
 * if a success response is received.
 * @param {int} groupId
 * @return {promise} Returns a promise
 *
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
