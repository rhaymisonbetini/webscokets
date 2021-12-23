const socket = io('http://localhost:9000');

socket.on('messageFromServer', (dataFromServer) => {
document.querySelector('#messages').innerHTML += `<li>SERVER SAYS: ${dataFromServer.data}</li>`;
})

document.querySelector('#message-form').addEventListener('submit', (event) => {
    event.preventDefault();
    const newMessage = document.querySelector('#user-message').value;
    socket.emit('newMessageToServer', { text: newMessage })
})

socket.on('messageToClients', (msg) => {
    document.querySelector('#messages').innerHTML += `<li>${msg.text}</li>`;
})