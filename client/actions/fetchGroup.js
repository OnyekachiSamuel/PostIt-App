import axios from 'axios';
import { FETCH_GROUP_SUCCESS } from './actionTypes';

export const fetchGroup = (payload) => {
  return {
    type: FETCH_GROUP_SUCCESS,
    payload
  };
};


export const fetchGroupRequest = () => {
  return (dispatch) => {
    const username = localStorage.getItem('username');
    return axios.get(`/api/groups/${username}`).then((payload) => {
      dispatch(fetchGroup(payload));
    });
  };
};
