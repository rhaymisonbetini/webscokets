const express = require('express')
const socketio = require('socket.io')
const app = express()

app.use(express.static(__dirname + '/public'));

const expressServer = app.listen(9000);
const io = socketio(expressServer)

let namespaces = require('./datas/namespace')

io.on('connection', () => {
    let nsData = namespaces.map((ns) => {
        return {
            img: ns.img,
            endpoint: ns.endpoint,
        }
    })

    io.emit('nsList', nsData)
})

namespaces.forEach((namespace) => {
    io.of(namespace.endpoint).on('connection', (nsSocket) => {
        console.log(`${nsSocket.id} has join ${namespace.endpoint}`)
        nsSocket.emit('nsRoomLoad', namespace.rooms)
    })
})
