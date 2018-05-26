const { Transform } = require("stream");

//This stream is responsible of finding country for a given tweet

module.exports = class CountryStream extends Transform {
  constructor(country = "fr") {
    super({ objectMode: true });
    this.country = country;
  }

  _transform(chunk, encoding, callback) {
    let tweet = JSON.parse(chunk.toString());

    if (
      (tweet.user && tweet.user.lang == this.country) || //if we don't find any country we use world by default
      this.country == "world"
    ) {
      this.push(chunk);
    }

    callback();
  }
};
