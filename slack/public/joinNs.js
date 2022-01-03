function joinNs(endpoint) {
    nsSocket = io(`http://localhost:9000/${endpoint}`)

    let topRoomName;

    nsSocket.on('nsRoomLoad', (nsRooms) => {
        let roomList = document.querySelector('.room-list');
        topRoomName = nsRooms[0].roomTitle
        joinRoom(topRoomName)


        roomList.innerHTML = '';

        nsRooms.forEach((room) => {
            let glyph = room.privateRoom ? 'lock' : 'globe'
            roomList.innerHTML += `<li class="room"><span class="glyphicon glyphicon-${glyph}"></span>${room.roomTitle}</li>`
        })
    })

    let roomNodes = document.getElementsByClassName('room')

    Array.from(roomNodes).forEach((node) => {
        node.addEventListener('click', () => {

        })
    })

    nsSocket.on('messageToClients', (msg) => {
        document.querySelector('#messages').innerHTML += buildHtml(msg)
    })

    document.querySelector('.message-form').addEventListener('submit', (event) => {
        event.preventDefault();
        const newMessage = document.querySelector('#user-message').value;
        nsSocket.emit('newMessageToServer', { text: newMessage })
    })

    const buildHtml = (msg) => {
        const convertedDate = new Date(msg.time).toLocaleString()
        const newHTML = `
            <li>
                <div class="user-image">
                    <img src="${msg.avatar}">
                </div>
                <div class="user-message">
                    <div class="user-name-time">${msg.username} <span>${convertedDate}</span></div>
                    <div class="message-text">${msg.text}</div>
                </div>
            </li>
        `
        return newHTML;
    }
}