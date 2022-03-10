// JavaScript: Haftnotiz
window.onload = init;

function init() {
    var button = document.getElementById("button_hinzufuegen");
    button.onclick = notizErstellen;

    for (var i = 0; i < localStorage.length; i++) {
        var schluessel = localStorage.key(i);
        if (schluessel.substring(0, 5) == "notiz") {
            var wert = localStorage.getItem(schluessel);
            notizInDomEinfuegen(wert);
        }
    }
}


function notizInDomEinfuegen(wert) {
    var haftnotizen = document.getElementById("haftnotizen");
    var notiz = document.createElement("li");
    var span = document.createElement("span");
    span.setAttribute("class", "notiz");
    span.innerHTML = wert;
    notiz.appendChild(span);
    haftnotizen.appendChild(notiz);
}


function notizErstellen() {
    var wert = document.getElementById("notiz_text").value;
    var schluessel = "notiz_" + localStorage.length;
    localStorage.setItem(schluessel, wert);

    notizInDomEinfuegen(wert);
}
