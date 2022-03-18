// selectors.js
window.onload = init;

function init() {
    // Wir bitten die Selectors-API um das <p>-Element 'avatar'; ... es ist wie document.getElementID("avatar")
    var avatar = document.querySelector("#avatar").innerHTML;
    alert("#avatar: " + avatar)

    // Nun wählen wir das Element anhand seiner Klasse: Tag-Name und die Klasse
    var plevel5 = document.querySelector("p.level5").innerHTML;
    alert("p.level5: " + plevel5);

    // Wir können auch ein <p>-Element auswählen, das ein Kind des <div>-Elementes ist
    var divp = document.querySelector("div>p").innerHTML;
    alert("div>p: " + divp);

    // Class --> ihnalt, dann das ERSTE Kind-Element --> <p>
    var inhaltp = document.querySelector(".inhalt>p").innerHTML;
    alert(".inhalt>p: " + inhaltp);

    // Alle <p>-Elemente im <div> ==> Array und dort können wir dann auf die einzelnen Array-Elemente zugreifen.
    var allSelector = document.querySelectorAll("div>p")[1].innerHTML;
    alert("div>p)[1]: " + allSelector);
}

/*
<body>
    <div class="inhalt">
        <p id="avatar" class="level5">Gorilla</p>
        <p id="farbe">Lilla</p>
    </div>
</body>
 */
