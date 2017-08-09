import axios from 'axios';
import jwt from 'jsonwebtoken';
import store from '../store/configureStore';
import { FETCH_GROUP_SUCCESS } from './actionTypes';

const fetchGroup = (payload) => {
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
