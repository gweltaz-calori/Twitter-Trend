const { Readable } = require("stream");
const twitterClientInstance = require("../services/TwitterClient");
const lookup = require("country-data").lookup;

module.exports = class TrendStream extends Readable {
  constructor(trend = "Trump") {
    super({ objectMode: true });
    this.client = twitterClientInstance;
    this.trend = trend;
    this.connect();
  }

  _read() { }

  connect() {
    this.stream = this.client.stream("statuses/filter", { track: this.trend });
    this.stream.on("data", event => {
      this.push(JSON.stringify(event));
    });

    this.stream.on("error", function (err) {
      console.log(err);
    });
  }
};
