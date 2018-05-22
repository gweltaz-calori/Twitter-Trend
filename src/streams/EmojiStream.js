const twemoji = require("twemoji");
const { Transform } = require("stream");

module.exports = class DeviceStream extends Transform {
  constructor() {
    super({ objectMode: true });
  }

  _transform(chunk, encoding, callback) {
    let tweetText = JSON.parse(chunk.toString()).text;
    let emoji = {};

    twemoji.parse(tweetText, (icon, opts, variant) => {
      emoji.code = icon;
      emoji.imageUrl = `${opts.base}${opts.size}/${icon}${opts.ext}`;
    });

    if (emoji.imageUrl) {
      this.push(JSON.stringify(emoji));
    }

    callback();
  }
};
