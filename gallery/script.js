

//    var numbersArray = [60, 50, 51, 62, 58, 54, 51, 54];
// Wir benötigen jetzt ein Array mit Objekten:
const app_state_data = [
  {
    title: 'Blumen in der Vase',
    item: 'img/item1.jpg',
    rating: 3.5
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
  <p></p>
`;
document.body.appendChild( div );

const str1 = "Hallo Welt!";
const str2 = 'Hallo Welt!';
const str3 = `Hallo Welt!`;
 */

app_state_data.forEach( function ( obj, i, arr ) {
  console.log( obj, i, arr );
} );

const arr = [1,2,3];
arr.forEach( function ( num, i, arr ) {
  console.log( num, i, arr );
} );

