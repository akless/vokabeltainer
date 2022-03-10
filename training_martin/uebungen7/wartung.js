/* wartung.js */

window.onload = function() {
    var loeschButton = document.getElementById("loesch_button");
    loeschButton.onclick = speicherLoeschen;
}

function speicherLoeschen() {
    localStorage.clear();
}
