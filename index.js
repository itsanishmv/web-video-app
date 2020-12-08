
navigator.mediaDevices.webKitgetUserMedia({ video: true, audio: true }, function (stream) {

    var Peer = require("simple-peer")
    var peer = new Peer({
        initiator: location.hash == '#init',
        trickle: false,
        stream: stream
    })
    peer.on("signal", function (data) {
        document.getElementById("yourid").value = JSON.stringify(data)
    })
    document.getElementById('connect').addEventListener('click', function () {
        var otherid = JSON.parse(document.getElementById('otherid').value)
        peer.signal(otherid)
    })
    document.getElementById('send').addEventListener('click', function () {
        var yourmessage = document.getElementById('yourmessage').value
        peer.send(yourmessage)
    })
    peer.on("data", function (data) {
        document.getElementById('message').textContent += alert(data + "\n")
    })
    peer.on('stream', function () {

        var video = document.createElement("video")
        document.body.appendChild(video)
        video.srcObject = MediaStream(stream)
        video.play()
    })
}, function (err) {
    console.error(err)
})
