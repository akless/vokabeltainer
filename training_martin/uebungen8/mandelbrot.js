/*
 * mandelbrot.js
 */

var anzahlWorkers = 8;
var workers = [];
var zeilenDaten;
var naechsteZeile = 0;
var generation = 0;

window.onload = init;

function init() {
    setupGrafik();

    //
    // Wenn Sie auf das Canvas klicken, wir der Handler aufgerufen.
    // Ein event-Objekt mit der X-/Y-Position des Mausklicks wird übergeben.
    //  Diese Werte übergeben wir an den click-Handler.
    //
    canvas.onclick = function(event) {
        clickHandler(event.clientX, event.clientY);
    };
    //
    // Wenn sich die Größe des Browserfensters ändert, müssen wir
    //	die Größe des Canvas anpassen und die Workers neu starten.
    //
    window.onresize = function() {
        anFensterAnpassen();
    };

    //
    // Alle Workers erstellen und Nachrichten-Handler einrichten.
    // 	Jeden Worker zum Array workers hinzufügen.
    //
    for (var i = 0; i < anzahlWorkers; i++) {
        var worker = new Worker("mandel_worker.js");

        worker.onmessage = function(event) {
            verarbeiteErgebnis(event.target, event.data)
        }

        worker.leerlauf = true;
        workers.push(worker);
    }

    //
    // Workers starten
    //
    starteWorkers();

}

//
// starteWorkers
//	Diese Funktion setzt die Workers zurück, sodass sie
//		mit der ersten Zeile des Fraktals beginnen (zeile 0). Es werden
//		alle Workers im Array workers durchlaufen und jedem
//		eine Zeile zum Berechnen zugewiesen.
//	Durch eine Nachricht mit der jeweiligen Aufgabe starten wir die
//		Berechnung der einzelnen Workers.
//
function starteWorkers() {
    generation++;
    naechsteZeile = 0;
    for (var i = 0; i < workers.length; i++) {
        var worker = workers[i];
        if (worker.leerlauf) {
            var aufgabe = erstelleAufgabe(naechsteZeile);
            worker.leerlauf = false;
            worker.postMessage(aufgabe);
            naechsteZeile++;
        }
    }
}

//
// verarbeiteErgebnis
// 	Diese Funktion rufen wir auf, wenn der Worker
//	  eine Nachricht mit den Ergebnissen schickt.
//	Wenn der Worker an der aktuellen Fraktal-Generation arbeitet,
//		zeichnen wir die Zeile, ansonsten verwerfen wir die Daten.
//	Sobald wir die Ergebnisse verarbeitet haben, beauftragen wir
//		den Worker mit der Berechnung einer weiteren Zeile.
//
function verarbeiteErgebnis(worker, workerErgebnisse) {
    if (workerErgebnisse.generation == generation) {
        zeichneZeile(workerErgebnisse);
    }
    beauftrageWorker(worker);
}

//
// beauftrageWorker
//	Diese Funktion weist einem Worker im Leerlauf die nächste Aufgabe zu.
//
function beauftrageWorker(worker) {
    var zeile = naechsteZeile++;
    if (zeile >= canvas.height) {
        worker.leerlauf = true;
    } else {
        var aufgabe = erstelleAufgabe(zeile);
        worker.leerlauf = false;
        worker.postMessage(aufgabe);
    }
}


// clickHandler
//	Diese Funktion erwartet die X-/Y-Position des Mausklicks
//		und legt die Parameter für das nächste Fraktal fest.
//		Der Zoomfaktor legt die neuen Grenzen der
//		Mandelbrot-Menge für die Vergrößerung fest.
//		Das neue Fraktal behält das Seitenverhältnis
//		der aktuellen Canvas-Größe bei.
//	Wir starten alle Worker neu für die Berechnung des
//		vergrößerten Fraktals.
//
function clickHandler(x, y) {
    var breite = r_max - r_min;
    var hoehe = i_min - i_max;
    var click_r = r_min + ((breite * x) / canvas.width);
    var click_i = i_max + ((hoehe * y) / canvas.height);

    var zoom = 8;

    r_min = click_r - breite/zoom;
    r_max = click_r + breite/zoom;
    i_max = click_i - hoehe/zoom;
    i_min = click_i + hoehe/zoom;

    starteWorkers();
}

//
// anFensterAnpassen
//	Wenn der Benutzer die Größe des Browserfensters ändert,
//		wird diese Funktion aufgerufen, um die Größte des Canvas
//		anzupassen und die Fraktal-Parameter einzurichten
//		(Grenzen und neues Seitenverhältnis des Fensters).
//	Wir starten die Workers neu, um das Fraktal auf Grundlage
//		der neuen Größe neu zu berechnen.
//
function anFensterAnpassen() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    var breite = ((i_max - i_min) * canvas.width / canvas.height);
    var r_mid = (r_max + r_min) / 2;
    r_min = r_mid - breite/2;
    r_max = r_mid + breite/2;
    zeilenDaten = ktx.createImageData(canvas.width, 1);

    starteWorkers();
}
