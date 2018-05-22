const { Readable } = require("stream");
const Twitter = require("twitter");
const lookup = require("country-data").lookup;

module.exports = class TrendStream extends Readable {
  constructor(trend = "Trump") {
    super({ objectMode: true });
    this.client = new Twitter({
      consumer_key: process.env.CONSUMER_KEY,
      consumer_secret: process.env.CONSUMER_SECRET,
      access_token_key: process.env.ACCESS_TOKEN_KEY,
      access_token_secret: process.env.ACCESS_TOKEN_SECRET
    });
    this.trend = trend;
    this.connect();
  }

  _read() {}

  connect() {
    this.stream = this.client.stream("statuses/filter", { track: this.trend });
    this.stream.on("data", event => {
      this.push(JSON.stringify(event));
    });

    this.stream.on("error", function(err) {
      console.log(err);
    });
  }
};
