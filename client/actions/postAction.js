import axios from 'axios';
import sC from '../socket/socketController';
import { POST_MESSAGE_SUCCESSFUL } from './actionTypes';


export const testAction = (payload, groupId) => {
  const socket = sC.getSocket();
  console.log('socket with id ', socket.id, ' sent message');
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
        const { data } = response.data;
        dispatch(postedMessage(data));
        dispatch(testAction(data.message, groupId));
        Materialize.toast('Message sent', 2000, 'green white-text rounded');
      }
    });
  };
};
