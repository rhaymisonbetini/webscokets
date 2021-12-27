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
})