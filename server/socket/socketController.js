import jwt from 'jsonwebtoken';
import { getUserGroups } from '../controllers/helper/getUserGroups';

const sockets = {};

/**
 * Some class
 */
class SocketController {
  static init(io) {
    io.on('connection', SocketController.handleOnConnection);
  }

  static handleOnConnection(socket) {
    console.log(`Socket with id  ${socket.id} connected`);
    // keeping track of all our connected sockets
    sockets[socket.id] = socket;
    socket.on('register-groups', SocketController.handleRegisterGroups);
    socket.on('message', SocketController.handleSocketMessage);
    socket.on('group-message', SocketController.handleGroupMessage);
    socket.on('disconnect', () => { SocketController.hanldeSocketDisconnect(socket.id); });
  }

  static handleSocketMessage(data) {
    console.log('handle socket message called', data);
  }

  static hanldeSocketDisconnect(sId) {
    console.log(`Socket with id  ${sId} disconnected`);
    delete sockets[sId];
  }
  static handleGroupMessage(data) {
    console.log('group message', data);
    const sock = sockets[data.socketId];
    sock.join(data.groupId);
    sock.broadcast.to(data.groupId).emit('message', data.payload);
  }

  static handleRegisterGroups(data) {
    const { socketId } = data;
    const user = jwt.decode(data.token);
    const groups = getUserGroups(user.userId, (result) => {
      const { groupDetails } = result;
      groupDetails.forEach((groupId) => {
        const sock = sockets[socketId];
        sock.join(groupId);
        console.log(socketId, ' joint group ', groupId);
        // sock.emit('message', { msg: `you have joined group ${groupId}` });
      });
    });
  }
}

export default SocketController;
