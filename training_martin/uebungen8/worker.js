// worker.js

onmessage = pingPong;
function pingPong(event) {
    if (event.data == "Ping") {
        postMessage("Ping");
    }
}
