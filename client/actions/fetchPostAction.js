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
    debugger;
    const userId = localStorage.getItem('userId');
    console.log(userData, userId, '==============');
    return axios.get(`/api/posts/${userData}/${userId}`).then((payload) => {
      if (payload.data.status === 'success') {
        console.log(payload);
        debugger;
        dispatch(fetchPostSuccess(payload.data.data));
      }
    });
  };
};

