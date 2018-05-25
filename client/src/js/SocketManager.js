import io from "socket.io-client";

const ON_EMOJI = "ON_EMOJI";
const ON_DEVICE = "ON_DEVICE";
const ON_WORD = "ON_WORD";
const ON_TWEET = "ON_TWEET";

const ON_TREND_CHANGED = "ON_TREND_CHANGED";
const ON_LANGUAGE_CHANGED = "ON_LANGUAGE_CHANGED";

export default class SocketManager {
  static init() {
    this.socket = io.connect("http://localhost:5600");
  }

  static onEmoji(cb) {
    this.socket.on(ON_EMOJI, cb);
  }

  static onDevice(cb) {
    this.socket.on(ON_DEVICE, cb);
  }

  static onWord(cb) {
    this.socket.on(ON_WORD, cb);
  }

  static onTweet(cb) {
    this.socket.on(ON_TWEET, cb);
  }

  static changeTrend(trend) {
    this.socket.emit(ON_TREND_CHANGED, { trend });
  }

  static changeLang(lang) {
    this.socket.emit(ON_LANGUAGE_CHANGED, { lang });
  }
}
