import io from 'socket.io-client';
import SocketController from './socketController';

const configSocketCtrl = (dispatch) => {
  const socketUrl = 'http://localhost:3000';
  const socket = io(socketUrl);
  SocketController.init(dispatch, socket);
  return socket;
};

export default configSocketCtrl;
