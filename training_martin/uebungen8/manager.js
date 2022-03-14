// manager.js

window.onload = function () {
    var worker = new Worker("worker.js");

    worker.postMessage("Ping");

    worker.onmessage = function (event) {
        var meldung = "Worker sagt: " + event.data;
        document.getElementById("ausgabe").innerHTML = meldung;
    }
}
