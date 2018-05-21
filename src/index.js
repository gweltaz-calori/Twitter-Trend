const env = require('./env'); //load environnement variables before anything else
const http = require('http');
const io = require('socket.io')
const fs = require('fs')
const path = require('path')
const { fileExtensions } = require('./utils')

const server = http.createServer()
const socketIo = io(server)

const TrendStream = require('./streams/TrendStream')
const CountryStream = require('./streams/CountryStream')
const DeviceStream = require('./streams/DeviceStream')
const EmojiStream = require('./streams/EmojiStream')
const WordStream = require('./streams/WordStream')

const SocketEmojiStream = require('./streams/SocketEmojiStream')
const SocketDeviceStream = require('./streams/SocketDeviceStream')
const SocketWordStream = require('./streams/SocketWordStream')

socketIo.on('connection', socket => { })

server.on('request', (req, res) => {

    if (req.url == "/") {
        let index = fs.createReadStream(path.resolve(__dirname, '../public/index.html'))
        index.pipe(res)
    }

})

server.listen(process.env.SERVER_PORT, () => {
    console.log(`Server listening on port ${process.env.SERVER_PORT}`)
    console.log(`Using "/${process.env.PUBLIC_DIRNAME}" as static directory`)
})


let mainStream = new TrendStream('Trump')
    .pipe(new CountryStream('en'))

mainStream
    .pipe(new DeviceStream())
    .pipe(new SocketDeviceStream(socketIo))

mainStream
    .pipe(new EmojiStream())
    .pipe(new SocketEmojiStream(socketIo))

mainStream
    .pipe(new WordStream())
    .pipe(new SocketWordStream(socketIo))
