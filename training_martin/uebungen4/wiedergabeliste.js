
window.onload = init;
function init() {
    var button = document.getElementById("buttonHinzufuegen");
    var formMl = document.querySelector("form");
    formMl.onsubmit = buttonClickHandler;
    // button.onclick = buttonClickHandler;
    // New to load the list: --->
    wiedergabelisteLaden();
    martin1();


    // Zusätzlich mit der Return-Taste...

}
function buttonClickHandler() {
    var textInput = document.getElementById("songTextInput");
    var sontTitel = textInput.value;
    if (sontTitel =="" ) {
        alert("Bitte geben Sie einen Song ein!");
    } else {
        var li = document.createElement("li");
        li.innerHTML = sontTitel;
        var ul = document.getElementById("wiedergabeliste");
        ul.appendChild(li);
        // New to save the list: --->
        speichern(sontTitel);
        var inputMartin = "Baum und Sonne";
        martin2(inputMartin);
        martin2(sontTitel);

    }

    // alert("Schaltfläche wurde geklickt!");
}


