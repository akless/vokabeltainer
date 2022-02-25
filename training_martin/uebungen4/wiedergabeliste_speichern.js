/* wiedergabeliste_speichern.js
 *
 * Code-Fertiggericht zum Lesen und Speichern der Wiedergabelisten-Elemente
 */

function speichern(element) {
    var listenArray = speicherArrayAbrufen("wiedergabeliste");
    listenArray.push(element);
    localStorage.setItem("wiedergabeliste", JSON.stringify(listenArray));
}

function wiedergabelisteLaden() {
    var listenArray = gespeicherteSongsLaden();
    var ul = document.getElementById("wiedergabeliste");
    if (listenArray != null) {
        for (var i = 0; i < listenArray.length; i++) {
            var li = document.createElement("li");
            li.innerHTML = listenArray[i];
            ul.appendChild(li);
        }
    }
}

function gespeicherteSongsLaden() {
    return speicherArrayAbrufen("wiedergabeliste");
}

function speicherArrayAbrufen(schluessel) {
    var listenArray = localStorage.getItem(schluessel);
    if (listenArray == null || listenArray == "") {
        listenArray = new Array();
    }
    else {
        listenArray = JSON.parse(listenArray);
    }
    return listenArray;
}
