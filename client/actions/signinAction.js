import axios from 'axios';
import jwt from 'jsonwebtoken';
import { SET_CURRENT_USER } from './actionTypes';

const setUser = (payload) => {
  return {
    type: SET_CURRENT_USER,
    payload
  };
};


export const userSigninRequest = (userData) => {
  return (dispatch) => {
    return axios.post('http://localhost:3000/api/signin', userData).then((payload) => {
      if (payload.data.status === 'success') {
        window.localStorage.setItem('token', payload.data.token);
        window.localStorage.setItem('username', payload.data.data.username);
        window.localStorage.setItem('userId', payload.data.data.userId);
        dispatch(setUser(jwt.decode(payload.data.token)));
        location.href = '/group';
      } else if (payload.data.status === 'failed') {
        Materialize.toast(payload.data.message, 2000, 'green white-text rounded');
      }
    });
  };
};
