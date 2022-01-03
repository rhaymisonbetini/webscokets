const express = require('express')
const socketio = require('socket.io')
const app = express()

app.use(express.static(__dirname + '/public'));

const expressServer = app.listen(9000);
const io = socketio(expressServer)

let firstRoom = '';

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

        nsSocket.emit('nsRoomLoad', namespace.rooms)

        nsSocket.on('joinRomom', async (roomToJoin, numberOfUsersCallback) => {

            nsSocket.join(roomToJoin)
            firstRoom = roomToJoin;

            var numberOfclients = await io.of(namespace.endpoint).in(roomToJoin).allSockets()
            numberOfUsersCallback(numberOfclients.size)
        })

        nsSocket.on('newMessageToServer', (msg) => {

            const fullMsg = {
                text: msg.text,
                time: Date.now(),
                username: 'user',
                avatar: 'http://via.placeholder.com/30'
            }

            io.of(namespace.endpoint).to(firstRoom).emit('messageToClients', fullMsg)
        })

    })
})
