/*
 * worker_bib.js
 *
 */

/* -------- Code-Fertiggericht: Worker ------- */

//
// Berechnet eine Zeile des Fraktals.
// Das Array werte für den Manager-Code enthält
//	für jedes Pixel der Zeile eine Zahl.
//
function berechneZeile(aufgabe) {
    var iter = 0;
    var c_i = aufgabe.i;
    var max_iter = aufgabe.max_iter;
    var escape = aufgabe.escape * aufgabe.escape;
    aufgabe.werte = [];
    for (var i = 0; i < aufgabe.breite; i++) {
        var c_r = aufgabe.r_min + (aufgabe.r_max - aufgabe.r_min) * i / aufgabe.breite;
        var z_r = 0, z_i = 0;

        for (iter = 0; z_r*z_r + z_i*z_i < escape && iter < max_iter; iter++) {
            // z -> z^2 + c
            var tmp = z_r*z_r - z_i*z_i + c_r;
            z_i = 2 * z_r * z_i + c_i;
            z_r = tmp;
        }
        if (iter == max_iter) {
            iter = -1;
        }
        aufgabe.werte.push(iter);
    }
    return aufgabe;
}
