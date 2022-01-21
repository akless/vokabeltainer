
alert("Hallo Welt und hallo André!");

var phrase = "die Katze fängt die Maus";

var index = phrase.indexOf("Katze");
console.log("Bei Index " + index + " gibt es eine Katze")

index = phrase.indexOf("Hund");
console.log("Bei Index " + index + " gibt es einen Hund");



var data = "name|phone|address";
var vals = data.split("|");
console.log("Split array is ", vals);

// Regular Expressions
var phoneNumber = new RegExp(/^\d{3}-?\d{4}$/);
var amyHome = "555-1212"
var invalid = "5556-1212"
var result = amyHome.match(phoneNumber);
var result2 = invalid.match(phoneNumber);
console.log(result);
console.log(result2);

console.log("===================================================================");
function Duck(sound){
    this.sound = sound;
    this.quack = function () {console.log(this.sound);}
}

var toy = new Duck("quak quak quak");
toy.quack();
console.log(typeof toy);
console.log(toy instanceof Duck);
console.log("===================================================================");
