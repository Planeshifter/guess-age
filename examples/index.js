'use strict';

var guess = require( './../lib' );

console.log( 'Statistics for Herbert:\n' );
console.dir( guess( 'Herbert' ) );
console.log( '\n' );

console.log( 'Statistics for Jason:\n' );
console.dir( guess( 'Jason' ) );
console.log( '\n' );

console.log( 'Statistics for Connor:\n' );
console.dir( guess( 'Connor' ) );
console.log( '\n' );
