const { Writable } = require("stream");

const ON_TWEET = "ON_TWEET";

//This stream is a socket stream that will send the tweet output

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
