import jwt from 'jsonwebtoken';
import { getUserGroups } from '../controllers/helper/getUserGroups';

const sockets = {};

/**
 * Some class
 */
class SocketController {
  /**
   *@return {null} Socket initialization
   * @param {obj} io
   */
  static init(io) {
    io.on('connection', SocketController.handleOnConnection);
  }

/**
 * @return {null} Listens for events
 * @param {obj} socket
 */
  static handleOnConnection(socket) {
    console.log(`Socket with id  ${socket.id} connected`);
    // keeping track of all our connected sockets
    sockets[socket.id] = socket;
    socket.on('register-groups', SocketController.handleRegisterGroups);
    socket.on('message', SocketController.handleSocketMessage);
    socket.on('group-message', SocketController.handleGroupMessage);
    socket.on('disconnect', () => { SocketController.hanldeSocketDisconnect(socket.id); });
  }

/**
 * @return {null} Callback function for socket listener
 * @param {data} data
 */
  static handleSocketMessage(data) {
    console.log('handle socket message called', data);
  }

/**
 * @return {null} Callback for disconnect listener
 * @param {string} sId
 */
  static hanldeSocketDisconnect(sId) {
    console.log(`Socket with id  ${sId} disconnected`);
    delete sockets[sId];
  }
  /**
   * @return {null} Callback function for GroupMessage Listener
   * @param {obj} data
   */
  static handleGroupMessage(data) {
    const sock = sockets[data.socketId];
    sock.join(data.groupId);
    sock.broadcast.to(data.groupId).emit('message', data.payload);
  }

/**
 * @return {null} Callback function for Register Group Listener
 * @param {obj} data
 */
  static handleRegisterGroups(data) {
    const { socketId } = data;
    const user = jwt.decode(data.token);
    const groups = getUserGroups(user.userId, (result) => {
      const { groupDetails } = result;
      if (groupDetails.length > 0) {
        groupDetails.forEach((groupId) => {
          const sock = sockets[socketId];
          sock.join(groupId);
          console.log(socketId, ' joint group ', groupId);
        });
      }
    });
  }
}

export default SocketController;
