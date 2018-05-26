const { Readable } = require("stream");
const twitterClientInstance = require("../services/TwitterClient");

const TREND_SUGGESTIONS = [
  "Trump",
  "parcoursup"
]
const lookup = require("country-data").lookup;



module.exports = class TrendStream extends Readable {
  constructor() {
    super({ objectMode: true });
    this.client = twitterClientInstance;
    this.trend = ""
    this.suggestions = TREND_SUGGESTIONS
    this.connect();
  }

  _read() { }

  async connect() {
    const data = await twitterClientInstance.get('trends/place', { id: 1 })
    const trends = [...this.suggestions, ...data[0].trends.slice(0, 10).map(trend => trend.name)]
    this.trend = trends[0]
    this.stream = this.client.stream("statuses/filter", { track: trends.join(',') });
    this.stream.on("data", event => {

      if (
        event.text &&
        event.text.toUpperCase().includes(this.trend.toUpperCase())) {

        this.push(JSON.stringify(event));
      }
    });

    this.stream.on("error", function (err) {
      console.log(err);
    });
  }
};
