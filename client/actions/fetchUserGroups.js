import axios from 'axios';
import { FETCH_USER_GROUPS } from './actionTypes';

/**
 *
 * @param {obj} payload
 * @return {obj} Action dispatched when an
 * axios call is made to get all groups a user belongs to
 */
export const fetchUserGroups = (payload) => {
  return {
    type: FETCH_USER_GROUPS,
    payload
  };
};

/**
 *
 * @param {int} userId
 * @return {promise} Makes an axios call to get all groups
 * a user belongs to. fetchUserGroups action is dispatched on a
 * successful get request
 */
export const fetchUserGroupRequest = (userId) => {
  return (dispatch) => {
    return axios.get(`/api/v1/groups/user/${userId}`).then((response) => {
      dispatch(fetchUserGroups(response.data));
    });
  };
};
