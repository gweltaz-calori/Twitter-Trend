const { Transform } = require("stream");

//This stream is responsible for formatting tweets by removing useless properties

module.exports = class FormatTweetStream extends Transform {
  constructor() {
    super({ objectMode: true });
  }

  _transform(chunk, encoding, callback) {
    try {
      let tweet = JSON.parse(chunk.toString());

      let formattedTweet = {
        followersCount: tweet.user.followers_count,
        author: tweet.user.name,
        text: tweet.text,
        id: tweet.id,
        image: tweet.user.profile_image_url_https
      };
      this.push(JSON.stringify(formattedTweet));
    } catch (e) {}

    callback();
  }
};
