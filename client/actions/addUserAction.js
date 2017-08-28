import axios from 'axios';
import sC from '../socket/socketController';
import { ADD_USER_SUCCESS, ADD_USER_FAILURE } from './actionTypes';

export const addUserSuccess = (payload) => {
  return {
    type: ADD_USER_SUCCESS,
    payload
  };
};

export const testAction = (payload) => {
  console.log(payload, '=====payload=======');
  const socket = sC.getSocket();
  console.log('socket with id ', socket.id, ' sent message');
  socket.emit('register-groups', Object.assign({}, { socketId: 'sisiisisisisisisis' }, payload));
  // socket.emit('register-groups', 'register groups');
  return {
    type: 'null'
  };
};

export const addUserFailure = (payload) => {
  return {
    type: ADD_USER_FAILURE,
    payload
  };
};

export const addUserRequest = (userData, groupId) => {
  return (dispatch) => {
    return axios.post(`/api/v1/group/${groupId}/user`, userData).then((response) => {
      if (response.status === 200) {
        dispatch(addUserSuccess(response.data));
        Materialize.toast(response.data.message, 2000, 'green white-text rounded');
      }
    }).catch((error) => {
      dispatch(addUserFailure(error.response.data.message));
      Materialize.toast(error.response.data.message, 2000, 'red lighten-4 white-text rounded');
    });
  };
};

