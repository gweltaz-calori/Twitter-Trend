const { Transform } = require("stream");
const { getWordsOccurenceCount } = require("../utils");

//this stream is responsible for retrieving word occurences from a given tweet

module.exports = class WordStream extends Transform {
  constructor() {
    super({ objectMode: true });
  }

  _transform(chunk, encoding, callback) {
    try {
      let tweetText = JSON.parse(chunk.toString()).text;
      this.push(JSON.stringify(getWordsOccurenceCount(tweetText)));
    } catch (e) {}

    callback();
  }
};
