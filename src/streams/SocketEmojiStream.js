const { Writable } = require('stream')

const ON_EMOJI = "ON_EMOJI"

module.exports = class SocketEmojiStream extends Writable {
    constructor(socket) {
        super({ objectMode: true })
        this.socket = socket
    }

    _write(chunk, encoding, callback) {
        let emoji = JSON.parse(chunk)
        this.socket.emit(ON_EMOJI, emoji)
        callback()
    }


}