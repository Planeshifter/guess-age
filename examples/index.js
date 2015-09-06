'use strict';

var guess = require( './../lib' ),
	out;


out = guess( 'Herbert' );
console.log( 'Statistics for Herbert:\n' );
console.dir( out );
console.log( '\n' );

out = guess( 'Jason' );
console.log( 'Statistics for Jason:\n' );
console.dir( out );
console.log( '\n' );

out = guess( 'Connor' );
console.log( 'Statistics for Connor:\n' );
console.dir( out );
console.log( '\n' );
