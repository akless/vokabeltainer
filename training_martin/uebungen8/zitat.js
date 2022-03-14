/* zitat.js */

var zitate = ["Ich hoffe, das Leben ist kein Witz - ich versteh's nämlich nicht.",
    "Es gibt ein Licht am Ende jedes Tunnels... Hoffentlich ist es kein Zug!",
    "Glaubst du an Liebe auf den ersten Blick, oder soll ich wieder gehen?"];

function zitatPosten() {
    var index = Math.floor(Math.random() * zitate.length);
    postMessage(zitate[index]);
}
zitatPosten();
setInterval(zitatPosten, 3000);

