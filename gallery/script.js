

//    var numbersArray = [60, 50, 51, 62, 58, 54, 51, 54];
// Wir benötigen jetzt ein Array mit Objekten:
const app_state_data = [
  {
    title: 'Blumen in der Vase',
    item: 'img/item1.jpg',
    rating: 3.5,
    ratings: {
      andre: 3,   // Object.keys() => ['andre','martin']
      martin: 4   // Object.values() => [3,4]
    },
    //ratings: [ 3, 4 ]
  },
  {
    title: 'Boote am Fluss',
    item: 'img/item2.jpg',
    rating: 0,
    ratings: {}
  }
];
// app_state_data.forEach( console.log );


refresh();

document.querySelector("#user").addEventListener('change', refresh);
// oninput als Alternative zu change !



document.querySelector('button').addEventListener('click', function () {
  // Hier kommt, was passiert, wenn man den Knopf drückt!
  gotoFormPage();
  //addNewItem(new_item);
});




function refresh() {

  document.querySelector("#gallery").innerHTML = "";

  /*   ===>>> forEach: <<<===
  forEach() ruft eine bereitgestellte callback-Funktion einmal für jedes Element in einem Array in aufsteigender
  Reihenfolge auf. Sie wird nicht für Elemente aufgerufen, die gelöscht oder nicht initialisiert wurden
  (d. h. Arrays mit leeren Elementen).

  callback wird mit drei Argumenten aufgerufen:

    1. Der Wert des Elements
    2. Der Index des Elements
    3. Das Array-Objekt, das durchlaufen wird    */


  app_state_data.forEach( function ( obj, i, arr ) {
    const div = document.createElement( 'div' );
    div.innerHTML = `
      <h2>${ obj.title }</h2>
      <img src="${ obj.item }">
      <p>
        <span class="stars"></span>
        <span class="ratings">(${ Object.keys( obj.ratings ).length })</span>
      </p>
      <p>Your Rating:</p>
      <p id="mystars"></p>
    `;

    const user = document.querySelector( "#user" ).value;
    renderStars( obj.ratings[ user ], div.querySelector( '#mystars' ) );
    // console.log(div);

    // Click-event: onclick
    console.log( div.querySelector( 'h2' ).innerText );
    div.querySelectorAll( '#mystars svg' ).forEach( function ( svg, i, stars ) {
      // console.log( svg );
      // console.log(i + " <===============================================")
      svg.addEventListener( "click", function () {
        // Hier kommt, was wir machen, wenn man auf den Stern klickt.
        const title = obj.title;
        const star = i + 1;
        console.log( user, title, star );
        obj.ratings[ user ] = star;
        console.log( app_state_data );

        const rating_values = Object.values( obj.ratings );
        const sum = rating_values.reduce( function(pv, cv) { return pv + cv; }, 0 );
        obj.rating = sum / rating_values.length;
        refresh();

      } );
    } );

    renderStars( obj.rating, div.querySelector( '.stars' ) );

    // add article to gallery
    document.querySelector("#gallery").appendChild( div );
  } );

}


function renderStars( rating = 0, elem ) {

  const star_empty = `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-star" viewBox="0 0 16 16">
      <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"/>
    </svg>
  `;
  const star_filled = `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
      <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
    </svg>
  `;
  const star_half = `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-half" viewBox="0 0 16 16">
      <path d="M5.354 5.119 7.538.792A.516.516 0 0 1 8 .5c.183 0 .366.097.465.292l2.184 4.327 4.898.696A.537.537 0 0 1 16 6.32a.548.548 0 0 1-.17.445l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256a.52.52 0 0 1-.146.05c-.342.06-.668-.254-.6-.642l.83-4.73L.173 6.765a.55.55 0 0 1-.172-.403.58.58 0 0 1 .085-.302.513.513 0 0 1 .37-.245l4.898-.696zM8 12.027a.5.5 0 0 1 .232.056l3.686 1.894-.694-3.957a.565.565 0 0 1 .162-.505l2.907-2.77-4.052-.576a.525.525 0 0 1-.393-.288L8.001 2.223 8 2.226v9.8z"/>
    </svg>  
  `;

  // iteriere bis zum Vorkomma-Wert (e.g. 3)
  let quantizedRating = Math.floor(rating);
  for ( let i = 0; i < quantizedRating; i++) {
    elem.innerHTML += star_filled;
  }
  if (quantizedRating != rating) {      // 3
    elem.innerHTML += star_half;
  }
  for ( let i = Math.ceil(rating); i < 5 ; i++) {
    elem.innerHTML += star_empty;
  }

}


function addNewItem (item) {
  app_state_data.push(item);
  refresh();
}



function gotoFormPage() {

  document.querySelector("#gallery").innerHTML = "";
  const div = document.createElement( 'div' );
  div.innerHTML = `
  <h2>Please insert your data</h2>
  <p>Titel: <input id="title_save" type="text" name="titel" value="Mona Lisa"></p>
  <p>Bild: <input id="bild_save" type="text" name="img" value="img/item4.jpg"></p>
  <button id="button_save" type="button">Save</button>
  `;
  const user = document.querySelector( "#user" ).value;

  document.querySelector("#gallery").appendChild( div );

  document.querySelector('#button_save').addEventListener('click', function () {
    let new_item = {};
    new_item.title = document.querySelector( "#title_save").value;
    new_item.item = document.querySelector("#bild_save").value;
    new_item.rating = 0;
    new_item.ratings = {};

    app_state_data.push(new_item);
    document.querySelector("#gallery").innerHTML = "";
    refresh();
    //addNewItem(new_item);
  });



  /*
  title: 'Mona Lisa',
  item: 'img/item4.jpg',




  app_state_data.forEach( function ( obj, i, arr ) {
    const div = document.createElement( 'div' );
    div.innerHTML = `
      <h2>${ obj.title }</h2>
      <img src="${ obj.item }">
      <p>
        <span class="stars"></span>
        <span class="ratings">(${ Object.keys( obj.ratings ).length })</span>
      </p>
      <p>Your Rating:</p>
      <p id="mystars"></p>
    `;

    const user = document.querySelector( "#user" ).value;
    renderStars( obj.ratings[ user ], div.querySelector( '#mystars' ) );
    // console.log(div);

    // Click-event: onclick
    console.log( div.querySelector( 'h2' ).innerText );
    div.querySelectorAll( '#mystars svg' ).forEach( function ( svg, i, stars ) {
      // console.log( svg );
      // console.log(i + " <===============================================")
      svg.addEventListener( "click", function () {
        // Hier kommt, was wir machen, wenn man auf den Stern klickt.
        const title = obj.title;
        const star = i + 1;
        console.log( user, title, star );
        obj.ratings[ user ] = star;
        console.log( app_state_data );

        const rating_values = Object.values( obj.ratings );
        const sum = rating_values.reduce( function(pv, cv) { return pv + cv; }, 0 );
        obj.rating = sum / rating_values.length;
        refresh();

      } );
    } );

    renderStars( obj.rating, div.querySelector( '.stars' ) );

    // add article to gallery
    document.querySelector("#gallery").appendChild( div );
  } );
  */
}



// Ideen für das nächste Mal:
// 1) Gallery ist erledigt, jetzt: WebComponente !  ==> w3c / André JS-WebComponente ! (Google: HTML erweitern)
// 2) Ich --> HTML, CSS, JS, ...
// 3) Wie kann der "Bürger" eine Gallery anlegen --> Eingabemaske
//    - Bild hochladen, Titel schreiben, mit URL arbeiten, ...
//    - Eingabemaske & neues Bild "einfügen"








//  A L T ==================================================================== <<<<<<<<













// Kosten: Vergleich kostet 1
// Dereferenzierung : 1
// Verzweigung: 1

// 5xa,b,c
// 1xa, 1xb, 3xc


/*
Next step:
- Rating: With the mouse, We can rate...
Es gibt einen Wert (durchschnitt der Ratings)
Ein zusätzliches Rating...
Klick event
 */










/*
const arr = [1,2,3];
arr.forEach( function ( num, i, arr ) {
  console.log( num, i, arr );
} );

// ===================================================================
let text = "";
const fruits = ["apple", "orange", "cherry"];
fruits.forEach(myFunction);

document.getElementById("demo").innerHTML = text;

function myFunction(item, index) {
  text += index + ": " + item + "<br>";
}
// ===================================================================



 */


/*
/*
for (let i=0; i < app_state_data.length; i++) {
  const obj = app_state_data[i];
  console.log(obj);
  for (const key in obj) {
    console.log( key, obj[ key ] );
  }
}
 */

// funktionale Schleife
// app_state_data.forEach( function ( obj ) {} );
// app_state_data.forEach( ( obj ) => { console.log( obj ); } );
// app_state_data.forEach( obj => console.log( obj ) );


/*
const div = document.createElement( 'div' );
div.innerHTML = `
  <h2>${ app_state_data[0].title }</h2>
  <img src="${app_state_data[0].item}">
  <p>Bla</p>
`;
document.body.appendChild( div );

const str1 = "Hallo Welt!";
const str2 = 'Hallo Welt!';
const str3 = `Hallo Welt!`;


 // N 1,2,3,4...
  // Z 0,N
  // N ... -3, ... 0, 1, 2...
  // R Z/N
  // Reellen Zahlen: R*Pi
  // Komplexe Zahlen (1+i)

  // Wie bekomme ich aus einer Reelen Zahl eine natürliche Zahl --> Math: ceil (aufrunden, floor (abrunden)

  // Math.floor(obj.rating);  3,5 --> 3






*/


