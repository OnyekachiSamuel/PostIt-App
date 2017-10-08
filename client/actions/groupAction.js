import axios from 'axios';
import { GROUP_CREATION_SUCCESS, GROUP_CREATION_FAILURE, FETCH_USERS_ID, GROUP_MEMBERS_UPDATE } from './actionTypes';

/**
 *
 * @param {obj} payload
 * @return {obj} Action dispatched when group
 * creation is successful
 */
export const createGroupSuccess = (payload) => {
  return {
    type: GROUP_CREATION_SUCCESS,
    payload
  };
};

/**
 *
 * @param {obj} errors
 * @return {obj} Action dispatched when group creation fails
 */
export const createGroupFailure = (errors) => {
  return {
    type: GROUP_CREATION_FAILURE,
    errors
  };
};

/**
 *
 * @param {obj} payload
 * @return {obj} Action dispatched when get request
 * for group members is successful
 */
export const getMembers = (payload) => {
  return {
    type: FETCH_USERS_ID,
    payload
  };
};

/**
 *
 * @param {obj} payload
 * @return {obj} Action dispatched to handle users added to a
 * group
 */
export const updateGroupMembers = (payload) => {
  return {
    type: GROUP_MEMBERS_UPDATE,
    payload
  };
};

/**
 *
 * @param {obj} groupDetails
 * @return {promise} Makes an axios call to create a new group.
 * createGroupSuccess action is dispatched on successful group
 * creation and createGroupFailure is dispatched on failed
 * operation
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
 *
 * @param {obj} groupId
 * @return {promise} Makes an axios call to get members that belongs to a
 * particular group.
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
