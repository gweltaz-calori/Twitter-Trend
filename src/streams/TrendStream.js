const { Readable } = require("stream");
const twitterClientInstance = require("../services/TwitterClient");

const { TREND_SUGGESTIONS } = require("../utils");
const lookup = require("country-data").lookup;

//This is the main stream (root), it can find all the tweet related to an hasthag / trend word

module.exports = class TrendStream extends Readable {
  constructor() {
    super({ objectMode: true });
    this.client = twitterClientInstance;
    this.trend = "";
    this.suggestions = TREND_SUGGESTIONS;
    this.connect();
  }

  _read() {}

  async connect() {
    const currentTrends = await twitterClientInstance.get("trends/place", {
      id: 1
    }); //retrieve the available trends
    const trends = [
      ...this.suggestions,
      ...currentTrends[0].trends.slice(0, 10).map(trend => trend.name)
    ]; //merge the default trend suggestion with the trends from the request
    this.trend = trends[0]; // set the first trend as default
    this.stream = this.client.stream("statuses/filter", {
      track: trends.join(",")
    }); //we make a request on all the trends possible so we can filter them later without destroying the stream
    this.stream.on("data", event => {
      if (
        event.text &&
        event.text.toUpperCase().includes(this.trend.toUpperCase())
      ) {
        this.push(JSON.stringify(event));
      }
    });

    this.stream.on("error", function(err) {
      console.log(err);
    });
  }
};
