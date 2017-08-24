import axios from 'axios';
import { FETCH_POST_SUCCESS } from './actionTypes';


export const fetchPostSuccess = (payload) => {
  return {
    type: FETCH_POST_SUCCESS,
    payload
  };
};

export const fetchPostRequest = (groupId, userId) => {
  return (dispatch) => {
    return axios.get(`api/v1/posts/${groupId}/${userId}`)
    .then((response) => {
      if (response.status === 200) {
        const { data } = response.data;
        dispatch(fetchPostSuccess(data));
      }
    });
  };
};
