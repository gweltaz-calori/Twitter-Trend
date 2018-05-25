
const natural = require('natural');
const tokenizer = new natural.WordTokenizer();

module.exports = {
    getWordsOccurenceCount(tweet) {
        let tokens = tokenizer.tokenize(tweet.toLowerCase());
        return tokens.reduce((counter, item) => {
            counter[item] = counter.hasOwnProperty(item) ? counter[item] + 1 : 1;
            return counter;
        }, {})
    }
}