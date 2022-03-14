/*
 * mandel_bib.js
 *
 *
 * ------ Globale Variablen für Code-Fertiggericht ----
 */
var canvas;
var ktx;

var i_max = 1.5;
var i_min = -1.5;
var r_min = -2.5;
var r_max = 1.5;

var max_iter = 1024;
var escape = 100;
var palette = [];


/*
 * ------- Code-Fertiggericht --------
 *
 */

//
// Verpackt die Daten, die wir an den Worker schicken müssen
//
function erstelleAufgabe(zeile) {
    var aufgabe = {
        zeile: zeile,				// Zeilennummer, an der wir arbeiten
        breite: zeilenDaten.width,   // Breite des ImageData-Objekt
        generation: generation, // Wie weit wir sind
        r_min: r_min,
        r_max: r_max,
        i: i_max + (i_min - i_max) * zeile / canvas.height,
        max_iter: max_iter,
        escape: escape
    };
    return aufgabe;
}
//
// Diese Funktion weist die Zahlen 0 bis max_iter
// 256 Farben zu und füllt die Palette mit RGB-Werten,
// damit die Farbewerte, die im Array nebeneinander liegen, auch
// farblich relativ ähnlich sind.
//
function erstellePalette() {
    function verpacken(x) {
        x = ((x + 256) & 0x1ff) - 256;
        if (x < 0) x = -x;
        return x;
    }
    for (i = 0; i <= this.max_iter; i++) {
        palette.push([verpacken(7*i), verpacken(5*i), verpacken(11*i)]);
    }
}

function zeichneZeile(workerErgebnisse) {
    var werte = workerErgebnisse.werte;	// Das Array werte vom Worker
    var pixelDaten = zeilenDaten.data;		// Tatsächliche Pixel im ImageData-Objekt
                                              //  pixelDaten ist eine *Referenz* auf
                                              // 	zeilenDaten.data! Änderungen an pixelDaten
                                              // 	ändern also zeilenDaten.data!!!
    for (var i = 0; i < zeilenDaten.width; i++) {  // Schleife über alle Pixel der Zeile
        var rot = i * 4;
        var gruen = i * 4 + 1;
        var blau = i * 4 + 2;
        var alpha = i * 4 + 3;

        pixelDaten[alpha] = 255; // Alpha 100% deckend

        // Für negative Werte nehmen wir Schwarz
        if (werte[i] < 0) {
            pixelDaten[rot] = pixelDaten[gruen] = pixelDaten[blau] = 0;
        } else {
            //
            // Zahl aus den Array werte vom Worker
            // einer Farbe aus der Palette zuweisen
            //
            var farbe = this.palette[werte[i]];

            //
            // Jede Farbe hat eine RGB-Komponente. Wir belegen entsprechend
            // die RGB-Werte des Pixels
            //
            pixelDaten[rot] = farbe[0];
            pixelDaten[gruen] = farbe[1];
            pixelDaten[blau] = farbe[2];
        }
    }
    //
    // Zeilte in Canvas zurückzeichnen:
    // workerErgebnisse.zeile ist die Zeilennummer, an der wir arbeiten
    // zeilenDaten enthält die eben aktualisierten Daten!
    // Wir beginnen in Spalte 0, deshlab ist x, y = 0
    //
    ktx.putImageData(this.zeilenDaten, 0, workerErgebnisse.zeile);
}


//
//   setupGrafik legt einige Anfangswerte für die Variablen der
// 	 Mandelbrot-Berechnung fest und passt Breite und Höhe des Canvas
//	 an die Fenstergröße an
//
function setupGrafik() {

    canvas = document.getElementById("fraktal");
    ktx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    var breite = ((i_max - i_min) * canvas.width / canvas.height);
    var r_mid = (r_max + r_min) / 2;
    r_min = r_mid - breite/2;
    r_max = r_mid + breite/2;

    zeilenDaten = ktx.createImageData(canvas.width, 1);

    erstellePalette();
}
