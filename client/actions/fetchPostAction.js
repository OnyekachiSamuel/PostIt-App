import axios from 'axios';
import { FETCH_POST_SUCCESS } from './actionTypes';


const fetchPostSuccess = (payload) => {
  return {
    type: FETCH_POST_SUCCESS,
    payload
  };
};

export const fetchPostRequest = (userData) => {
  return (dispatch) => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const config = { headers: {
      'x-access-token': token
    } };
    return axios.get(`http://localhost:3000/api/posts/${userData}/${userId}`).then((payload) => {
      if (payload.data.status === 'success') {
        dispatch(fetchPostSuccess(payload.data.data));
      }
    });
  };
};

