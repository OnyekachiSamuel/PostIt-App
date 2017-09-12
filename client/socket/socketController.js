
/**
 * @class
 */
class SocketController {
  /**
   * @constructor
   */
  constructor() {
    this.dispatch = null;
    this.socket = null;
    this.handleMessage = this.handleMessage.bind(this);
  }

  /**
   * Factory method returns a socket to be used
   * by other components in the app
   * @param {Object} d - dispatcher for this class
   * @param {Object} s - Socket for this object
   * @return {Oject} returns the configured socket controller
   */
  init(d, s) {
    // TODO: Need to understand better way to create a singleton in JS
    this.dispatch = d;
    this.socket = s;
    this.configureSocket(s);
    return this;
  }

/**
 * @return {null} Configure socket to listen for message event
 * @param {obj} socket
 */
  configureSocket(socket) {
    socket.on('message', this.handleMessage);
    socket.on('connect', () => {
    });
  }

/**
 * @return {null} Returns socket object
 */
  getSocket() {
    console.log('get socket called with socket ', this.socket.connected);
    if (this.socket === null) {
      throw new Error('Configure socket controller first');
    }
    return this.socket;
  }

/**
 * @return {null} Dispatches message action
 * @param {string} message
 */
  handleMessage(message) {
    // at this point we have our dispatcher and can update our store
    this.dispatch({ type: 'SENT_MESSAGE', payload: message });
    console.log('message from server - ', message);
  }
}

export default new SocketController();
