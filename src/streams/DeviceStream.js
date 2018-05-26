const { Transform } = require("stream");

const DEVICES = ["Android", "iPhone", "Web"]; //List of allowed devices

//This stream is responsible of finding device for a given tweet
module.exports = class DeviceStream extends Transform {
  constructor() {
    super({ objectMode: true });
  }

  _transform(chunk, encoding, callback) {
    let tweetSource = JSON.parse(chunk.toString()).source;

    if (tweetSource) {
      //some tweet don't have a source
      let os = {
        name: DEVICES.find(deviceItem => tweetSource.includes(deviceItem)) // find the os inside the devices
      };

      if (os.name) {
        //the os exists so let's add the buffer
        this.push(JSON.stringify(os));
      }
    }

    callback();
  }
};
