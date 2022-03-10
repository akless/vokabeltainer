// JavaScript: arraynotizen.js
window.onload = init;

function init() {
    var button = document.getElementById("button_hinzufuegen");
    button.onclick = notizErstellen;

	var loeschButton = document.getElementById("loesch_button");
	loeschButton.onclick = haftnotizenLoeschen;

    var notizArray = localStorage["notizArray"];
    if (!notizArray) {
        notizArray = [];
        localStorage.setItem("notizArray", JSON.stringify(notizArray));
    }
    else {
        notizArray = JSON.parse(notizArray);
    }

    for (var i = 0; i < notizArray.length; i++) {
        var schluessel = notizArray[i];
        var wert = JSON.parse(localStorage[schluessel]);
        notizInDomEinfuegen(schluessel, wert);
    }
}

// Extra: Tipps!
// var postitsML = {postits: [{message: "hallo1", x: 12, y: 30,}, {message: "hallo2", x: 12, y: 30,} ]}

function notizInDomEinfuegen(schluessel, notizObj) {
    /*
    postitsML.postits.forEach(function (arg) {
        alert(arg.message);
    }); */

    var haftnotizen = document.getElementById("haftnotizen");
    var notiz = document.createElement("li");
    notiz.setAttribute("id", schluessel);
    notiz.style.backgroundColor = notizObj.farbe;
    var span = document.createElement("span");
    span.setAttribute("class", "notiz");
    span.innerHTML = notizObj.wert;
    notiz.appendChild(span);
    haftnotizen.appendChild(notiz);
    notiz.onclick = notizLoeschen;
}


function notizErstellen() {
    var notizArray = notizArrayHolen();
    var farbWahlObj = document.getElementById("notiz_farbe");
    var index = farbWahlObj.selectedIndex;
    var farbe = farbWahlObj[index].value;
    //var aktuellesDatum = new Date();
    //var schluessel = "notiz_" + aktuellesDatum.getTime();
    var schluessel = "notiz_" + new String( new Date().getTime());
    var wert = document.getElementById("notiz_text").value;
    var notizObj = {
        "wert": wert,
        "farbe": farbe
    };
    /* Kann erweitert werden: Vgl. Jenniffer   <<<=============
    Key = pinnwand.io
    value = {"postits":[]}
    {"postits":[
        {"msg":"...",
        "x":22,
        "y":32,
        "date":"....."},
        // ...
        ]}
    */
    localStorage.setItem(schluessel, JSON.stringify(notizObj));
    // localStorage.setItem(schluessel, wert);
    notizArray.push(schluessel);
    localStorage.setItem("notizArray", JSON.stringify(notizArray));
    notizInDomEinfuegen(schluessel, notizObj);
}


function notizArrayHolen() {
    var notizArray = localStorage.getItem("notizArray");
    if (!notizArray) {
        notizArray = [];
        localStorage.setItem("notizArray", JSON.stringify(notizArray));
    } else {
        notizArray = JSON.parse(notizArray);
    }
    return notizArray;
}


function notizLoeschen(e) {
    var schluessel = e.target.id;
    if (e.target.tagName.toLowerCase() == "span") {
        schluessel = e.target.parentNode.id;
    }
    localStorage.removeItem(schluessel);
    var notizArray = notizArrayHolen();
    if (notizArray) {
        for (var i = 0; i < notizArray.length; i++) {
            if (schluessel == notizArray[i]) {
                notizArray.splice(i, 1);
            }
        }
        localStorage.removeItem(schluessel);
        localStorage.setItem("notizArray", JSON.stringify(notizArray));
        notizAusDomLoeschen(schluessel);
    }
}


function notizAusDomLoeschen(schluessel) {
    var notiz = document.getElementById(schluessel);
    notiz.parentNode.removeChild(notiz);
}


function haftnotizenLoeschen() {
    localStorage.clear();
    var notizListe = document.getElementById("haftnotizen");
    var haftnotizen = notizListe.childNodes;
    for (var i = haftnotizen.length-1; i >= 0; i--) {
        notizListe.removeChild(haftnotizen[i]);
    }
    var notizArray = notizArrayHolen();
}
