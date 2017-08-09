import axios from 'axios';
import { FETCH_USERS_SUCCESS } from './actionTypes';

const fetchUsers = (payload) => {
  return {
    type: FETCH_USERS_SUCCESS,
    payload
  };
};


export const fetchUsersRequest = () => {
  return (dispatch) => {
    return axios.get('/api/users').then((payload) => {
      dispatch(fetchUsers(payload));
    });
  };
};
