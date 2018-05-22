const env = require("./env"); //load environnement variables before anything else
const http = require("http");
const io = require("socket.io");
const fs = require("fs");
const path = require("path");
const { fileExtensions } = require("./utils");

const server = http.createServer();
const socketIo = io(server);

const TrendStream = require("./streams/TrendStream");
const CountryStream = require("./streams/CountryStream");
const DeviceStream = require("./streams/DeviceStream");
const EmojiStream = require("./streams/EmojiStream");
const WordStream = require("./streams/WordStream");
const FormatTweetStream = require("./streams/FormatTweetStream");

const SocketEmojiStream = require("./streams/SocketEmojiStream");
const SocketDeviceStream = require("./streams/SocketDeviceStream");
const SocketWordStream = require("./streams/SocketWordStream");
const SocketTweetStream = require("./streams/SocketTweetStream");

const ON_TREND_CHANGED = "ON_TREND_CHANGED";
const ON_LANGUAGE_CHANGED = "ON_LANGUAGE_CHANGED";

let countryStream = new CountryStream("en");

let mainStream = new TrendStream("Trump").pipe(countryStream);

mainStream.pipe(new DeviceStream()).pipe(new SocketDeviceStream(socketIo));

mainStream.pipe(new EmojiStream()).pipe(new SocketEmojiStream(socketIo));

mainStream.pipe(new WordStream()).pipe(new SocketWordStream(socketIo));

mainStream.pipe(new FormatTweetStream()).pipe(new SocketTweetStream(socketIo));

socketIo.on("connection", socket => {
  socket.on(ON_TREND_CHANGED, data => {});
  socket.on(ON_LANGUAGE_CHANGED, data => {
    countryStream.country = data.lang;
  });
});

server.on("request", (req, res) => {
  if (req.url == "/") {
    let index = fs.createReadStream(
      path.resolve(__dirname, "../public/index.html")
    );
    index.pipe(res);
  }
});

server.listen(process.env.SERVER_PORT, () => {
  console.log(`Server listening on port ${process.env.SERVER_PORT}`);
  console.log(`Using "/${process.env.PUBLIC_DIRNAME}" as static directory`);
});
