
const natural = require('natural');
const tokenizer = new natural.WordTokenizer();

module.exports = {
    fileExtensions: {
        '.ico': 'image/x-icon',
        '.html': 'text/html',
        '.js': 'text/javascript',
        '.json': 'application/json',
        '.css': 'text/css',
        '.png': 'image/png',
        '.jpg': 'image/jpeg',
        '.wav': 'audio/wav',
        '.mp3': 'audio/mpeg',
        '.svg': 'image/svg+xml',
        '.pdf': 'application/pdf',
        '.doc': 'application/msword'
    },
    getWordsOccurenceCount(tweet) {
        let tokens = tokenizer.tokenize(tweet.toLowerCase());
        return tokens.reduce((counter, item) => {
            counter[item] = counter.hasOwnProperty(item) ? counter[item] + 1 : 1;
            return counter;
        }, {})
    }
}