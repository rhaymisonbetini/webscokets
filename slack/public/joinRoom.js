function joinRoom(roomName) {

    nsSocket.emit('joinRomom', roomName, (newNumberOfMembers) => {
        document.querySelector('.curr-room-num-users').innerHTML = `${newNumberOfMembers} <span class="glyphicon glyphicon-user"></span></span>`
    });

}