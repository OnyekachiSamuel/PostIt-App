import axios from 'axios';
import { FETCH_POST_SUCCESS } from './actionTypes';


export const fetchPostSuccess = (payload) => {
  return {
    type: FETCH_POST_SUCCESS,
    payload
  };
};

export const fetchPostRequest = (userData) => {
  return (dispatch) => {
    const userId = localStorage.getItem('userId');
    return axios.get(`/api/posts/${userData}/${userId}`).then((payload) => {
      if (payload.data.status === 'success') {
        dispatch(fetchPostSuccess(payload.data.data));
      }
    });
  };
};
