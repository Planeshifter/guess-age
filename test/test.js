/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	guess = require( './../lib/index.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'guess-age', function tests() {

	it( 'should export a function', function test() {
		expect( guess ).to.be.a( 'function' );
	});

	it( 'should throw an error if the first argument is not a string', function test() {
		var values = [
			5,
			true,
			undefined,
			null,
			NaN,
			function(){},
			[],
			{}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[ i ] ) ).to.throw( TypeError );
		}
		function badValue( value ) {
			return function() {
				guess( value );
			};
		}
	});

	it( 'should throw an error if the gender argument is not `male` or `female`', function test() {
		var values = [
			'not female or male',
			5,
			true,
			undefined,
			null,
			NaN,
			function(){},
			[],
			{}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[ i ] ) ).to.throw( Error );
		}
		function badValue( value ) {
			return function() {
	            guess( 'Elijah', value );
			};
		}
	});

	it( 'should return statistics when supplied a name', function test() {
		var stats;
		stats = guess( 'Martin' );
		expect( stats ).to.have.property( 'iqr' );
		expect( stats).to.have.property( 'median' );
		expect( stats.iqr ).to.be.a( 'array' );
		expect( stats.median ).to.be.a( 'number' );

		stats = guess( 'Jennifer' );
		expect( stats ).to.have.property( 'iqr' );
		expect( stats).to.have.property( 'median' );
		expect( stats.iqr ).to.be.a( 'array' );
		expect( stats.median ).to.be.a( 'number' );
	});

	it( 'should return statistics when supplied a name and gender', function test() {
		var stats;
		stats = guess( 'Justin', 'male' );
		expect( stats ).to.have.property( 'iqr' );
		expect( stats).to.have.property( 'median' );
		expect( stats.iqr ).to.be.a( 'array' );
		expect( stats.median ).to.be.a( 'number' );

		stats = guess( 'Michelle', 'female' );
		expect( stats ).to.have.property( 'iqr' );
		expect( stats).to.have.property( 'median' );
		expect( stats.iqr ).to.be.a( 'array' );
		expect( stats.median ).to.be.a( 'number' );
	});

	it( 'should cache results when already invoked for a given name', function test() {
		var stats;
		stats = guess( 'Martin' );
		expect( stats ).to.have.property( 'iqr' );
		expect( stats).to.have.property( 'median' );
		expect( stats.iqr ).to.be.a( 'array' );
		expect( stats.median ).to.be.a( 'number' );

		stats = guess( 'Jennifer' );
		expect( stats ).to.have.property( 'iqr' );
		expect( stats).to.have.property( 'median' );
		expect( stats.iqr ).to.be.a( 'array' );
		expect( stats.median ).to.be.a( 'number' );

		stats = guess( 'Justin', 'male' );
		expect( stats ).to.have.property( 'iqr' );
		expect( stats).to.have.property( 'median' );
		expect( stats.iqr ).to.be.a( 'array' );
		expect( stats.median ).to.be.a( 'number' );

		stats = guess( 'Michelle', 'female' );
		expect( stats ).to.have.property( 'iqr' );
		expect( stats).to.have.property( 'median' );
		expect( stats.iqr ).to.be.a( 'array' );
		expect( stats.median ).to.be.a( 'number' );
	});

});
