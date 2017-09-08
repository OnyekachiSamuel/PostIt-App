import axios from 'axios';
import jwt from 'jsonwebtoken';
import sC from '../socket/socketController';
import { POST_MESSAGE_SUCCESSFUL } from './actionTypes';


export const testAction = (payload, groupId) => {
  const socket = sC.getSocket();
  socket.emit('group-message', Object.assign({}, { payload, groupId }, { socketId: socket.id }));
  return {
    type: 'null'
  };
};

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
        const token = localStorage.getItem('token');
        const decoded = jwt.decode(token);
        const { data } = response.data;
        dispatch(postedMessage(data));
        dispatch(testAction(data, groupId));
        if (!(decoded.username === data.username)) {
          sC.handleMessage(data);
        }
      }
    });
  };
};
