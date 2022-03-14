/*
 * mandel_worker.js
 */

importScripts("worker_bib.js");

onmessage = function (event) {
    var workerErgebnis = berechneZeile(event.data);
    postMessage(workerErgebnis);
}
