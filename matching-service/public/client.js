var socket = io('http://localhost:3000');
//var socket2 = io("insert endpoint of collaboration microservice here")
const l = console.log()

function getEl(id) {
    return document.getElementById(id)
}
const editor = getEl("editor")

editor.addEventListener("keyup", (evt) => {
    const text = editor.nodeValue
    socket.send(text)
})

socket.on('message', (data) => {
    editor.value = data;
})

//Socket testing
socket.on("connected", () => {
    socket.emit("register", "insertUuidHere");
}) 

socket.on("matchFound", (uuidField, partnerUuid, roomUuid) => {
    //connect to collaboration service with the above fields
})

//socket.emit("getMatch", uuid, difficulty);

//socket.emit("deregister")

//Propagate success to UI
socket.on("deregister_success", () => {

})

//Propagate failure to deregister to UI and try again
socket.on("deregister_failed", () => {
    socket.emit("deregister")
})