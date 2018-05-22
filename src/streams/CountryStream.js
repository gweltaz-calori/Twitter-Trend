const { Transform } = require("stream");

module.exports = class CountryStream extends Transform {
  constructor(country = "fr") {
    super({ objectMode: true });
    this.country = country;
  }

  _transform(chunk, encoding, callback) {
    let tweet = JSON.parse(chunk.toString());

    if (
      (tweet.user && tweet.user.lang == this.country) ||
      this.country == "world"
    ) {
      this.push(chunk);
    }

    callback();
  }
};
