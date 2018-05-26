const natural = require("natural");
const tokenizer = new natural.WordTokenizer();

module.exports = {
  getWordsOccurenceCount(tweet) {
    //tokenize to remove accentuation and ponctuation
    let tokens = tokenizer.tokenize(tweet.toLowerCase());
    return tokens.reduce((counter, item) => {
      counter[item] = counter.hasOwnProperty(item) ? counter[item] + 1 : 1; //count each item
      return counter;
    }, {});
  },
  TREND_SUGGESTIONS: ["Trump", "parcoursup"]
};
