const { Writable } = require("stream");

const ON_WORD = "ON_WORD";

//This stream is a socket stream that will send the word output

module.exports = class SocketWordStream extends Writable {
  constructor(socket) {
    super({ objectMode: true });
    this.socket = socket;
  }

  _write(chunk, encoding, callback) {
    let words = JSON.parse(chunk);
    this.socket.emit(ON_WORD, words);
    callback();
  }
};
