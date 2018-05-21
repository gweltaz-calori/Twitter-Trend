const { Writable } = require('stream')

const ON_WORD = "ON_WORD"

module.exports = class SocketWordStream extends Writable {
    constructor(socket) {
        super({ objectMode: true })
        this.socket = socket
    }

    _write(chunk, encoding, callback) {
        let words = JSON.parse(chunk)
        this.socket.emit(ON_WORD, words)
        callback()
    }


}