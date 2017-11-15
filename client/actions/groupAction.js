import axios from 'axios';
import { GROUP_CREATION_SUCCESS, GROUP_CREATION_FAILURE, FETCH_USERS_ID, GROUP_MEMBERS_UPDATE } from './actionTypes';

/**
 * Action dispatched when group creation is successful
 * @param {obj} payload
 * @return {obj} Returns object with payload
 *
 *
 */
export const createGroupSuccess = (payload) => {
  return {
    type: GROUP_CREATION_SUCCESS,
    payload
  };
};

/**
 * Action dispatched when group creation fails
 * @param {obj} errors
 * @return {obj} Returns object with error message payload
 *
 */
export const createGroupFailure = (errors) => {
  return {
    type: GROUP_CREATION_FAILURE,
    errors
  };
};

/**
 * Action dispatched when get request
 * for group members is successful
 * @param {obj} payload
 * @return {obj} Returns object with array of members payload
 *
 */
export const getMembers = (payload) => {
  return {
    type: FETCH_USERS_ID,
    payload
  };
};

/**
 * Action dispatched to handle users added to a group
 * @param {obj} payload
 * @return {obj} Returns object with payload
 *
 */
export const updateGroupMembers = (payload) => {
  return {
    type: GROUP_MEMBERS_UPDATE,
    payload
  };
};

/**
 * Makes an axios call to create a new group.
 * createGroupSuccess action is dispatched on successful group
 * creation and createGroupFailure is dispatched on failed
 * operation
 * @param {obj} groupDetails
 * @return {promise} Returns a promise
 *
 */
export const createGroup = (groupDetails) => {
  return (dispatch) => {
    return axios.post('/api/v1/group', groupDetails).then((res) => {
      if (res.status === 200) {
        dispatch(createGroupSuccess(res.data.group));
      }
    }).catch((error) => {
      dispatch(createGroupFailure(error.response.data.message));
      Materialize.toast(error.response.data.message, 2000, 'red white-text rounded');
    });
  };
};

/**
 * Makes an axios call to get members that belongs to a
 * particular group.
 * @param {obj} groupId
 * @return {promise} Returns a promise
 *
 */
export const fetchGroupUsers = (groupId) => {
  return (dispatch) => {
    return axios.post(`/api/v1/group/${groupId}/userIds`).then((response) => {
      if (response.status === 200) {
        const { groupMembers } = response.data;
        dispatch(getMembers(groupMembers));
      }
    });
  };
};
