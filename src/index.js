const env = require("./env"); //load environnement variables before anything else
const http = require("http");
const express = require("express");
const app = express();
const io = require("socket.io");
const twitterClientInstance = require("./services/TwitterClient");
const fs = require("fs");
const path = require("path");
const { fileExtensions } = require("./utils");

const server = http.Server(app);
const socketIo = io(server);

//middlewares
app.use(express.static(path.resolve("./public")));

//Transform Streams
const TrendStream = require("./streams/TrendStream");
const CountryStream = require("./streams/CountryStream");
const DeviceStream = require("./streams/DeviceStream");
const EmojiStream = require("./streams/EmojiStream");
const WordStream = require("./streams/WordStream");
const FormatTweetStream = require("./streams/FormatTweetStream");

// Write Streams (Socket)
const SocketEmojiStream = require("./streams/SocketEmojiStream");
const SocketDeviceStream = require("./streams/SocketDeviceStream");
const SocketWordStream = require("./streams/SocketWordStream");
const SocketTweetStream = require("./streams/SocketTweetStream");

// Socket constant
const ON_TREND_CHANGED = "ON_TREND_CHANGED";
const ON_LANGUAGE_CHANGED = "ON_LANGUAGE_CHANGED";

let countryStream = new CountryStream("en");
let trendStream = new TrendStream();

let mainStream = trendStream.pipe(countryStream); //initial stream

mainStream.pipe(new DeviceStream()).pipe(new SocketDeviceStream(socketIo)); //substream for devices

mainStream.pipe(new EmojiStream()).pipe(new SocketEmojiStream(socketIo)); //substream for emojis

mainStream.pipe(new WordStream()).pipe(new SocketWordStream(socketIo)); //substream for words

mainStream.pipe(new FormatTweetStream()).pipe(new SocketTweetStream(socketIo)); //substream for tweets

// Sockets
socketIo.on("connection", socket => {
  socket.on(ON_TREND_CHANGED, data => {
    trendStream.trend = data.trend;
  });

  socket.on(ON_LANGUAGE_CHANGED, data => {
    countryStream.country = data.lang;
  });
});

//alway send the index no matter what
app.get("*", (req, res) => {
  /* let index = fs.createReadStream(
    path.resolve(__dirname, "../public/index.html")
  );
  index.pipe(res); */
  res.sendFile(path.resolve(__dirname, "../public/index.html"));
});

// Retrieve the current trends so we can send them to the client
app.get("/api/trends", async (req, res) => {
  try {
    const data = await twitterClientInstance.get("trends/place", { id: 1 });
    res.send([
      ...trendStream.suggestions,
      ...data[0].trends.slice(0, 10).map(trend => trend.name)
    ]);
  } catch (e) {
    res.status(400).send("An error occured");
  }
});

//Retrieve the current filter being used since there is only one stream
app.get("/api/filter", (req, res) => {
  res.send({
    lang: countryStream.country
  });
});

//Retrieve the current trend being used
app.get("/api/trend", (req, res) => {
  res.send({
    trend: trendStream.trend
  });
});

server.listen(process.env.SERVER_PORT, () => {
  console.log(`Server listening on port ${process.env.SERVER_PORT}`);
  console.log(`Using "/${process.env.PUBLIC_DIRNAME}" as static directory`);
});
