const { Writable } = require("stream");

const ON_DEVICE = "ON_DEVICE";

//This stream is a socket stream that will send the device output

module.exports = class SocketDeviceStream extends Writable {
  constructor(socket) {
    super({ objectMode: true });
    this.socket = socket;
  }

  _write(chunk, encoding, callback) {
    let device = JSON.parse(chunk);
    this.socket.emit(ON_DEVICE, device);
    callback();
  }
};
