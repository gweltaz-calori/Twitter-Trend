const { Transform } = require('stream')
const { getWordsOccurenceCount } = require('../utils')

module.exports = class WordStream extends Transform {
    constructor() {
        super({ objectMode: true })
    }

    _transform(chunk, encoding, callback) {
        let tweetText = JSON.parse(chunk.toString()).text

        this.push(
            JSON.stringify(getWordsOccurenceCount(tweetText))
        )

        callback()
    }


}