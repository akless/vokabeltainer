
/* meinOrt.js */

var karte = null;
var unsereKoordinaten =  {
    latitude: 47.624851,
    longitude: -122.52099
};

window.onload = pruefeStandort;

function pruefeStandort() {
    if (navigator.geolocation) {

        navigator.geolocation.getCurrentPosition(
            zeigeStandort,
            zeigeFehler);
    }
    else {
        alert("Keine Geolocation-Unterstützung");
    }
}

function zeigeStandort(position) {
    var breite = position.coords.latitude;
    var laenge = position.coords.longitude;

    var div = document.getElementById("standort");
    div.innerHTML = "Ihr Breitengrad: " + breite + ", Ihr Längengrad: " + laenge;
    div.innerHTML += " (auf " + position.coords.accuracy + " m genau)";

    var km = berechneEntfernung(position.coords, unsereKoordinaten);
    var entfernung = document.getElementById("entfernung");
    entfernung.innerHTML = "Entfernung zum WickedlySmart-Hauptquartier: " + km + " km";

    zeigeKarte(position.coords);
}


// --------------------- Fertiggericht ------------------
//
// Berechnet die Entfernung zwischen zwei Koordinatenpunkten auf der Erdkugel
//
function berechneEntfernung(startCoords, zielCoords) {
    var startLatRads = gradInRadiant(startCoords.latitude);
    var startLongRads = gradInRadiant(startCoords.longitude);
    var zielLatRads = gradInRadiant(zielCoords.latitude);
    var zielLongRads = gradInRadiant(zielCoords.longitude);

    var Radius = 6371; // Erdradius in km
    var entfernung = Math.acos(Math.sin(startLatRads) * Math.sin(zielLatRads) +
        Math.cos(startLatRads) * Math.cos(zielLatRads) *
        Math.cos(startLongRads - zielLongRads)) * Radius;

    return entfernung;
}

function gradInRadiant(grad) {
    radiant = (grad * Math.PI)/180;
    return radiant;
}

// ------------------ Ende Fertiggericht -----------------

function zeigeKarte(coords) {
    var googleBreiteLaenge = new google.maps.LatLng(coords.latitude,
        coords.longitude);
    var kartenOptionen = {
        zoom: 10,
        center: googleBreiteLaenge,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var kartenDiv = document.getElementById("karte");
    karte = new google.maps.Map(kartenDiv, kartenOptionen);

    var titel = "Ihr Standort";
    var inhalt = "Sie sind hier: " + coords.latitude + ", " + coords.longitude;
    markerHinzufuegen(karte, googleBreiteLaenge, titel, inhalt);
}


function zeigeFehler(fehler) {
    var fehlerTypen = {
        0: "Unbekannter Fehler",
        1: "Keine Genehmigung",
        2: "Position nicht verfügbar",
        3: "Zeitüberschreitung der Anforderung"
    };
    var fehlerMeldung = fehlerTypen[fehler.code];
    if (fehler.code == 0 || fehler.code == 2) {
        fehlerMeldung = fehlerMeldung + " " + fehler.message;
    }
    var div = document.getElementById("standort");
    div.innerHTML = fehlerMeldung;
}


function markerHinzufuegen (karte, latlong, titel, inhalt) {
    var markerOptionen = {
        position: latlong,
        map: karte,
        titel: titel,
        clickable: true
    }
    var marker = new google.maps.Marker(markerOptionen);

    var infoFensterOptionen = {
        content: inhalt,
        position: latlong
    };
    var infoFenster = new google.maps.InfoWindow(infoFensterOptionen);

    google.maps.event.addListener(marker, "click", function () {
        infoFenster.open(karte);
    });
}








/*
window.onload = pruefeStandort;

var unsereKoordinaten = {
    latitude: 47.624851,
    longitude: -122.52099
};




function pruefeStandort() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(zeigeStandort, zeigeFehler);
    } else {
        alert("Kein Geolocaton-Unterstützung");
    }
}

function zeigeFehler(fehler) {
    var fehlerTypen = {
        0: "Unbekannter Fehler",
        1: "Keine Genehmigung vom Benutzer",
        2: "Position nicht verfügbar",
        3: "Zeitüberschreitung der Anforderung"
    };
    var fehlerMeldung = fehlerTypen[fehler.code];
    if (fehler.code == 0 || fehler.code == 2) {
        fehlerMeldung = fehlerMeldung + " " + fehler.message;
    }
    var div = document.getElementById("standort");
    div.innerHTML = fehlerMeldung;
}

function berechneEntfernung(startCoords, zielCoords) {
    var startLatRads = gradInRadiant(startCoords.latitude);
    var startLongRads = gradInRadiant(startCoords.longitude);
    var zielLatRads = gradInRadiant(zielCoords.latitude);
    var zielLongRads = gradInRadiant(zielCoords.longitude);

    var Radius = 6371;  // Erdradius in km
    var entfernung = Math.acos(Math.sin(startLatRads) * Math.sin(zielLatRads) + Math.cos(startLatRads) * Math.cos(zielLatRads) * Math.cos(startLongRads - zielLongRads)) * Radius;

    return entfernung;
}

function gradInRadiant(grad) {
    radiant = (grad * Math.PI) /180;
    return radiant;
}

var karte;

function zeigeKarte(coords) {
    var googleBreiteLaenge = new google.maps.LatLng(coords.latitude, coords.longitude);

    var kartenOptionen = {
        zoom: 10,
        center: googleBreiteLaenge,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var kartenDiv = document.getElementById("karte");
    karte = new google.maps.Map(kartenDiv, kartenOptionen);
}


function zeigeStandort(position) {
    var breite = position.coords.latitude;
    var laenge = position.coords.longitude;

    var div = document.getElementById("standort");
    div.innerHTML = "Ihr Breitengrad: " + breite + ", Ihr Längengrad: " + laenge;

    var km = berechneEntfernung(position.coords, unsereKoordinaten);
    //var div = document.getElementById("entfernung");
    var entfernung = document.getElementById("entfernung");
    entfernung.innerHTML = "Entfenung zum WickedlySmart-Hauptquartier: " + km + " km";

    zeigeKarte(position.coords);
}

zeigeKarte(position.coords);



 */



