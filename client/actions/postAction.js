import axios from 'axios';
import { POST_MESSAGE_SUCCESSFUL } from './actionTypes';

export const postedMessage = (payload) => {
  return {
    type: POST_MESSAGE_SUCCESSFUL,
    payload
  };
};

export const postRequest = (userData, groupId) => {
  return (dispatch) => {
    return axios.post(`/api/v1/group/${groupId}/messages`, userData).then((response) => {
      if (response.status === 200) {
        const { data } = response.data;
        dispatch(postedMessage(data));
        Materialize.toast('Message sent', 2000, 'green white-text rounded');
      }
    });
  };
};
