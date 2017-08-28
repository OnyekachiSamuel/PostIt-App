

class SocketController {
  constructor() {
    this.dispatch = null;
    this.socket = null;
    this.handleMessage = this.handleMessage.bind(this);
    this.handleGroupMessage = this.handleGroupMessage(this);
  }

  /**
   * Factory method bla bla returns a socket to be used
   * by other components in the app
   * @param {Object} d - dispatcher for this class
   * @param {Object} s - Socket for this object
   * @return {Oject} returns the configured socket controller
   */
  init(d, s) {
    // TODO: Need to understand better way to create a singleton in JS
    this.dispatch = d;
    console.log('object dispatcher is ', this.dispatch);
    this.socket = s;
    this.configureSocket(s);
    return this;
  }

  configureSocket(socket) {
    socket.on('message', this.handleMessage);
    socket.on('new message', this.handleGroupMessage);
  }

  getSocket() {
    console.log('get socket called with socket ', this.socket);
    if (this.socket === null) {
      throw new Error('Configure socket controller first');
    }
    return this.socket;
  }

  handleMessage(message) {
    // at this point we have our dispatcher and can update our store
    this.dispatch({ type: 'test-message', payload: 'test payload' });
    console.log('message from server - ', message);
  }
  handleGroupMessage(message) {
    console.log(message, '======group message======');
  }
}

export default new SocketController();
