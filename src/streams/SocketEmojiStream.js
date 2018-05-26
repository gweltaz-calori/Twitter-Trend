const { Writable } = require("stream");

const ON_EMOJI = "ON_EMOJI";

//This stream is a socket stream that will send the emoji output

module.exports = class SocketEmojiStream extends Writable {
  constructor(socket) {
    super({ objectMode: true });
    this.socket = socket;
  }

  _write(chunk, encoding, callback) {
    let emoji = JSON.parse(chunk);
    this.socket.emit(ON_EMOJI, emoji);
    callback();
  }
};
