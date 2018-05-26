const twemoji = require("twemoji"); //official twemoji library that can parse emoji inside a string
const { Transform } = require("stream");

//This stream is responsible of finding emojis for a given tweet

module.exports = class DeviceStream extends Transform {
  constructor() {
    super({ objectMode: true });
  }

  _transform(chunk, encoding, callback) {
    let tweetText = JSON.parse(chunk.toString()).text;
    let emoji = {};

    try {
      twemoji.parse(tweetText, (icon, opts, variant) => {
        emoji.code = icon; //each image has a code
        emoji.imageUrl = `${opts.base}${opts.size}/${icon}${opts.ext}`; //and an url
      });
    } catch (e) {
      console.log("Error parsing emoji"); //sometimes there is no emoji so
    }

    if (emoji.imageUrl) {
      this.push(JSON.stringify(emoji));
    }

    callback();
  }
};
