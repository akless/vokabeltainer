

//    var numbersArray = [60, 50, 51, 62, 58, 54, 51, 54];
// Wir benötigen jetzt ein Array mit Objekten:
const app_state_data = [
  {
    title: 'Blumen in der Vase',
    item: 'img/item1.jpg',
    rating: 3.5,
    ratings: {
      akless: 3,
      martin: 4
    },
    //ratings: [ 3, 4 ]
  },
  {
    title: 'Boote am Fluss',
    item: 'img/item2.jpg',
    rating: 2
  }
];

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
app_state_data.forEach( console.log );

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
*/

app_state_data.forEach( function ( obj, i, arr ) {
  // console.log( obj, i, arr );
  // console.log( obj );
  const div = document.createElement( 'div' );
  div.innerHTML = `
    <h2>${ obj.title }</h2>
    <img src="${ obj.item }">
    <p></p>
    <!-- <p>${ obj.rating }</p> -->
  `;
  const p = div.querySelector( 'p' );
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
  for ( let i = 1; i <= 5; i++ ) {
    if ( i <= obj.rating ) {
      p.innerHTML += star_filled;
    } else if ( i >= obj.rating + 1 ){
      p.innerHTML += star_empty;
    } else {
      p.innerHTML += star_half;
    }
  }
  document.body.appendChild( div );
} );


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
