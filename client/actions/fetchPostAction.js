import axios from 'axios';
import { FETCH_POST_SUCCESS } from './actionTypes';


export const fetchPostSuccess = (payload) => {
  return {
    type: FETCH_POST_SUCCESS,
    payload
  };
};

export const fetchPostRequest = (id, userId) => {
  const groupId = parseInt(id, 10);
  return (dispatch) => {
    return axios.get(`/api/v1/posts/${groupId}/${userId}`)
    .then((response) => {
      if (response.status === 200) {
        const { posts } = response.data;
        dispatch(fetchPostSuccess(posts));
      }
    });
  };
};
