// CSS

window.onload = function () {
    var url = "http://localhost/verkaufszahlen.json";
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
    zahlenDiv.innerHTML = responseText;
}
