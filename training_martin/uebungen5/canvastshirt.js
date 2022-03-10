// Canvas --> T-Shirt


window.onload = function () {
    var button = document.getElementById("vorschauButton");
    button.onclick = vorschauHandler;
    //kontext.fillRect(10, 10, 100, 100);

    // Osterei
    alert("Vor erzeuge Bild");
    erzeugeBild();
    alert(" --> Bild wurde erzeugt ! ");
}


function vorschauHandler() {
    var canvas = document.getElementById("tshirtCanvas");
    var kontext = canvas.getContext("2d");
    hintergrundFarbeFuellen(canvas, kontext);

    var selectObj = document.getElementById("formen");
    var index = selectObj.selectedIndex;
    var formen = selectObj[index].value;

    if (formen == "quadrate") {
        for (var quadrate = 0; quadrate < 20; quadrate++) {
            zeichneQuadrat(canvas, kontext);
        }
    } else if (formen == "kreise") {
        for (var kreise = 0; kreise < 20; kreise++) {
            zeichneKreis(canvas, kontext);
        }
    }
    zeichneText(canvas, kontext);
    zeichneVogel(canvas, kontext);

}


function zeichneQuadrat(canvas, kontext) {
    var w = Math.floor(Math.random() * 40);
    var x = Math.floor(Math.random() * canvas.width);
    var y = Math.floor(Math.random() * canvas.height);

    kontext.fillStyle = "lightblue";
    kontext.fillRect(x, y, w, w);
}


function zeichneKreis(canvas, kontext) {
    var radius = Math.floor(Math.random() * 40);
    var x = Math.floor(Math.random() * canvas.width);
    var y = Math.floor(Math.random() * canvas.height);

    kontext.beginPath();
    kontext.arc(x, y, radius, 0, gradInRadiant(360), true);

    kontext.fillStyle = "lightblue";
    kontext.fill();
}


// Zeichnet den gesamten Text
function zeichneText(canvas, kontext) {
    var selectObj = document.getElementById("textFarbe");
    var index = selectObj.selectedIndex;
    var vgFarbe = selectObj[index].value;

    kontext.fillStyle = vgFarbe;
    kontext.font = "bold 1em sans-serif";
    kontext.textAlign = "left";
    kontext.fillText("Ich hab folgenden Tweet gefunden:", 20, 40);

    // ===================================================================================>>> !!!!!!!!!!!
/*
    // Tweet zeichnen!
    selectObj = document.getElementById("tweets");
    index = selectObj.selectedIndex;
    var tweet = selectObj[index].value;

    // Leider hat das obige nicht funktioniert - und auch das (***) nicht!
    */
    kontext.font = "italic 1.2em serif";
    tweetML = "Wohin Sie auch gehen, da sind Sie - Konfucius oder Buckaroo Banza?";
    kontext.fillText(tweetML, 30, 100);

    // (***)
    //kontext.fillText(tweet, 30, 100);
    // ===================================================================================>>> !!!!!!!!!!!



    // Wenn Sie zeilenUmbrechen für längere Tweets versuchen möchten,
    // entfernen Sie den Kommentar um diesen Block und
    // kommentieren Sie die obige Zeile kontext.fillText aus.
    /*
        if (tweet.length > 60) {
            var tweetZeilen  = zeilenUmbrechen(tweet);
            for (var i = 0; i < tweetZeilen.length; i++) {
                kontext.fillText(tweetZeilen
    [i], 30, 70+(i*25));
            }
        }
        else {
            kontext.fillText(tweet, 30, 100);
        }
    */
    kontext.font = "bold 1em sans-serif";
    kontext.textAlign = "right";
    kontext.fillText("... aber nur dieses lausige T-Shirt bekommen!", (canvas.width -20), (canvas.height -40));
}



// Twitter-Vogel
function zeichneVogel(canvas, kontext) {
    var twitterVogel = new Image();
    twitterVogel.src = "twitterVogel.png";
    twitterVogel.onload = function() {
        kontext.drawImage(twitterVogel, 20, 120, 70, 70);
    };
}



function hintergrundFarbeFuellen(canvas, kontext) {
    var selectObj = document.getElementById("hintergrundFarbe");
    var index = selectObj.selectedIndex;
    var hgFarbe = selectObj.options[index].value;
    kontext.fillStyle = hgFarbe;
    kontext.fillRect(0, 0, canvas.width, canvas.height);
}


function gradInRadiant(grad) {
    return (grad * Math.PI)/180;
}


function aktualisiereTweets(tweets) {
    var tweetAuswahl = document.getElementById("tweets");

    // Alle Tweets in das Tweets-Men� einf�gen
    for (var i = 0; i < tweets.length; i++) {
        tweet = tweets[i];

        // Option erstellen
        var option = document.createElement("option");
        option.text = tweet.text;

        // Alle Anführungszeichen aus dem Tweet entfernen, damit unsere Option
        // nicht zerstört wird
        option.value = tweet.text.replace("\"", "'");

        // Option zum select-Element hinzuf�gen
        tweetAuswahl.options.add(option);
    }
    // Obersten Tweet auswählen
    tweetAuswahl.selectedIndex = 0;
}



// Osterei
function erzeugeBild() {
    var canvas = document.getElementById("tshirtCanvas");
    canvas.onclick = function () {
        window.location = canvas.toDataURL('image/png');
    };
}
