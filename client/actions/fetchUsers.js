import axios from 'axios';
import { FETCH_USERS_SUCCESS } from './actionTypes';

export const fetchUsers = (payload) => {
  return {
    type: FETCH_USERS_SUCCESS,
    payload
  };
};


export const fetchUsersRequest = (userData) => {
  console.log(userData.offset, 'userData====offset====');
  return (dispatch) => {
    return axios.get(`/api/v1/users?offset=${userData.offset}&search=${userData.search}`).then((response) => {
      console.log(response, 'res');
      dispatch(fetchUsers(response));
    });
  };
};
