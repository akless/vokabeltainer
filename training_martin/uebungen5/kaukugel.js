// JS

window.onload = function () {
    // var url = "http://localhost/verkaufszahlen.json";
    //var url = "http://localhost/~WebstormProjects/vokabeltainer/training_martin/uebungen5/verkaufszahlen.json";
    //var url = "http://127.0.0.1/Users/martin/WebstormProjects/vokabeltainer/training_martin/uebungen5/verkaufszahlen.json";
    var url = "./../../Resources/verkaufszahlen.json";

    var request = new XMLHttpRequest();
    request.open("GET", url);
    request.onload = function () {
        if (request.status == 200) {
            aktualisiereZahlen(request.responseText);
        }
    };
    request.send(null);
}


function aktualisiereZahlen(responseText) {
    var zahlenDiv = document.getElementById("verkauft");
    // zahlenDiv.innerHTML = responseText;
    var verkauft = JSON.parse(responseText);

    for (var i = 0; i < verkauft.length; i++) {
        var zahl = verkauft[i];
        var div = document.createElement("div");
        div.setAttribute("class", "verkaufsZahl");
        div.innerHTML = zahl.name + ": " + zahl.sales + " Kaugummis verkauft";
        zahlenDiv.appendChild(div);
    }

}
