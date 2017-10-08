import axios from 'axios';
import { ADD_USER_SUCCESS, ADD_USER_FAILURE } from './actionTypes';

/**
 * @return {obj} Action dispatched when adding a user
 * to a group is succesful
 * @param {obj} payload
 */
export const addUserSuccess = (payload) => {
  return {
    type: ADD_USER_SUCCESS,
    payload
  };
};

/**
 * @return {obj} Action dispatched when adding a user to a group fails.
 * Payload here is the error message.
 * @param {string} payload
 */
export const addUserFailure = (payload) => {
  return {
    type: ADD_USER_FAILURE,
    payload
  };
};

/**
 * @return {promise} Makes an axios call and dispatches an action addUserSuccess
 *  if api call is successful or addUserFailure if error occcured
 * @param {obj} userData
 * @param {int} groupId
 */
export const addUserRequest = (userData, groupId) => {
  return (dispatch) => {
    return axios.post(`/api/v1/group/${groupId}/user`, userData).then((response) => {
      if (response.status === 200) {
        dispatch(addUserSuccess(response.data));
        Materialize.toast(response.data.message, 2000, 'green white-text rounded');
      }
    }).catch((error) => {
      dispatch(addUserFailure(error.response.data.message));
      Materialize.toast(error.response.data.message, 2000, 'red lighten-4 white-text rounded');
    });
  };
};
