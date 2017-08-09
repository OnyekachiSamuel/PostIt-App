import axios from 'axios';
import { POST_MESSAGE_SUCCESSFUL } from './actionTypes';

const postedMessage = (payload) => {
  return {
    type: POST_MESSAGE_SUCCESSFUL,
    payload
  };
};

export const postRequest = (userData, groupId) => {
  return (dispatch) => {
    const token = localStorage.getItem('token');
    const config = { headers: {
      'x-access-token': token
    } };
    return axios.post(`http://localhost:3000/api/group/${groupId}/messages`, userData).then((payload) => {
      if (payload.data.status === 'success') {
        dispatch(postedMessage(payload.data.data));
        Materialize.toast('Message sent', 2000, 'green white-text rounded');
      }
    });
  };
};
