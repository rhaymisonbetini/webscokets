const socket = io('http://localhost:9000')

socket.on('connection', () => {
    console.log(socket.id)
})

socket.on('nsList', (nsData) => {
    let namespaceDiv = document.querySelector('.namespaces');
    namespaceDiv.innerHTML = "";

    nsData.forEach((ns) => {
        namespaceDiv.innerHTML += `<div class="namespace" ns=${ns.endpoint}><img src="${ns.img}"/></div>`
    })

    Array.from(document.getElementsByClassName('namespace')).forEach((ns) => {
        ns.addEventListener('click', () => {
            const nsEndpoint = element.getAttribute('ns')
        })
    })

    const nsSocket = io('http://localhost:9000/wiki')

    nsSocket.on('nsRoomLoad', (nsRooms) => {
        let roomList = document.querySelector('.room-list');

        roomList.innerHTML = '';
        nsRooms.forEach((room) => {
            let glyph = room.privateRoom ? 'lock' : 'globe'
            roomList.innerHTML += `<li class="room"><span class="glyphicon glyphicon-${glyph}"></span>${room.roomTitle}</li>`
        })
    })

    let roomNodes = document.getElementsByClassName('room')

    Array.from(roomNodes).forEach((node) => {
        node.addEventListener('click', () =>{

        })
    })

})