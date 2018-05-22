const { Writable } = require("stream");

const ON_TWEET = "ON_TWEET";

module.exports = class SocketTweetStream extends Writable {
  constructor(socket) {
    super({ objectMode: true });
    this.socket = socket;
  }

  _write(chunk, encoding, callback) {
    let tweet = JSON.parse(chunk);
    this.socket.emit(ON_TWEET, tweet);

    callback();
  }
};
