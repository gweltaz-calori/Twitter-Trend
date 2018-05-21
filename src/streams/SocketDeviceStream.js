const { Writable } = require('stream')

const ON_DEVICE = "ON_DEVICE"

module.exports = class SocketDeviceStream extends Writable {
    constructor(socket) {
        super({ objectMode: true })
        this.socket = socket
    }

    _write(chunk, encoding, callback) {
        let device = JSON.parse(chunk)
        this.socket.emit(ON_DEVICE, device)
        callback()
    }


}