const { Transform } = require('stream')

const DEVICES = [
    "Android",
    "iPhone",
    "Web"
]

module.exports = class DeviceStream extends Transform {
    constructor() {
        super({ objectMode: true })
    }

    _transform(chunk, encoding, callback) {
        let tweetSource = JSON.parse(chunk.toString()).source

        let os = {
            name: DEVICES.find((deviceItem) => tweetSource.includes(deviceItem))
        }

        this.push(JSON.stringify(os))


        callback()
    }


}