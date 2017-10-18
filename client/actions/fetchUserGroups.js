import axios from 'axios';
import { FETCH_USER_GROUPS } from './actionTypes';

/**
 * Action dispatched when an
 * axios call is made to get all groups a user belongs to
 * @param {obj} payload
 * @return {obj} Returns object with payload of user groups
 */
export const fetchUserGroups = (payload) => {
  return {
    type: FETCH_USER_GROUPS,
    payload
  };
};

/**
 * Makes an axios call to get all groups
 * a user belongs to. fetchUserGroups action is dispatched on a
 * successful get request
 * @param {int} userId
 * @return {promise} Returns a promise
 */
export const fetchUserGroupRequest = (userId) => {
  return (dispatch) => {
    return axios.get(`/api/v1/groups/user/${userId}`).then((response) => {
      dispatch(fetchUserGroups(response.data));
    });
  };
};
