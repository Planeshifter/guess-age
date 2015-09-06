'use strict';

// MODULES //

var genderProb = require( 'gender-probability' ),
	isString = require( 'validate.io-string-primitive' );


// DATA //

var PERCENT_ALIVE = require( '../data/percent_alive.json' ),
	MALES = {},
	FEMALES = {};

// LOAD GENDER DATA

genderProb.load( 'us' );


/**
* FUNCTION capitalize( str )
*	Capitalizes the first letter of the supplied string.
*
* @param {String} str - input string
* @returns {String} string in which first letter is capitalized
*/
function capitalize( str ) {
	if ( !isString( str ) ) {
		throw new TypeError( 'capitalize()::invalid input argument. Must be a string. Value: `' + str + '`' );
	}
	return str.charAt(0).toUpperCase() + str.slice(1);
} // end FUNCTION capitalize()


// GET STATISTICS //

/**
* FUNCTION getStats( nameData )
*   Calculates the median and interquartile range for the age of all living
*   persons with the name associated to `nameData`
*
* @param {Array} nameData - array holding [year, count] pairs for given name
* @returns {Object} object with `median` and `iqr` properties
*/
function getStats( nameData ) {
	var data, record,
		count,
		finished,
		weightSum, sum,
		stats = {},
		len = nameData.length,
		i, j;

	data = [];
	weightSum = 0;
	for ( i = 0; i < len; i++ ) {
		record = nameData[ i ];
		count = record[ 1 ] * PERCENT_ALIVE[ record[ 0 ] - 1880 ];
		weightSum += count;
		data.push( [ 2014 - record[ 0 ], count ] );
	}
	// Calculate Median and IQR
	j = 0;
	sum = weightSum - data[ j ][ 1 ];
	finished = false;
	stats.iqr = [];
	while ( sum > 3*weightSum/4 ) {
	  j++;
	  sum -= data[ j ][ 1 ];
	}
	stats.iqr[ 1 ] = data[ j ][ 0 ];
	while ( sum > weightSum/2 ) {
	  j++;
	  sum -= data[ j ][ 1 ];
	}
	stats.median = data[ j ][ 0 ];
	while ( sum > weightSum/4 ) {
	  j++;
	  sum -= data[ j ][ 1 ];
	}
	stats.iqr[ 0 ] = data[ j ][ 0 ];
	return stats;
} // end FUNCTION getStats()


/**
* FUNCTION retrieve( name, gender )
*	Retrieve age statistics for persons with the supplied `name` and `gender`.
*
* @param {String} name - name of person for which age should be guessed
* @param {String} gender - gender of said person, `male` or `female`
* @returns {Object} object with `median` and `iqr` for the age of persons with the specified name and gender
*/
function retrieve( name, gender ) {
	var genderProbs,
		nameFreq,
		stats;
	if ( !isString( name ) ) {
		throw new TypeError('guess-age()::invalid input argument. Name argument must be a string. Value: `' + name + '`' );
	}
	if ( arguments.length > 1 ) {
		if ( gender !== 'male' && gender !== 'female' ) {
			throw new Error('guess-age()::invalid input argument. Gender argument must be `male` or `female`. Value: `' + gender + '`' );
		}
		switch ( gender ) {
		case 'male':
			if ( !MALES[ name ] ) {
				nameFreq = require( 'datasets-male-first-names-us-frequency/lib/' + name + '.json' );
				MALES[ name ] = getStats( nameFreq );
				return MALES[ name ];
			}
			return MALES[ name ];
		case 'female':
			if ( !FEMALES[ name ] ) {
				nameFreq = require( 'datasets-female-first-names-us-frequency/lib/' + name + '.json' );
				FEMALES[ name ] = getStats( nameFreq );
			}
			return FEMALES[ name ];
		}
	} else {
		genderProbs = genderProb.get( capitalize( name ) ).data.prob;
		if ( !MALES[ name ] ) {
			nameFreq = require( 'datasets-male-first-names-us-frequency/lib/' + name + '.json' );
			MALES[ name ] = getStats( nameFreq );
		}
		if ( !FEMALES[ name ] ) {
			nameFreq = require( 'datasets-female-first-names-us-frequency/lib/' + name + '.json' );
			FEMALES[ name ] = getStats( nameFreq );
		}
		stats = {};
		stats.median = genderProbs.male * MALES[ name ].median + genderProbs.female * FEMALES[ name ].median;
		stats.iqr = [];
		stats.iqr[ 0 ] = genderProbs.male * MALES[ name ].iqr[ 0 ] + genderProbs.female * FEMALES[ name ].iqr[ 0 ];
		stats.iqr[ 1 ] = genderProbs.male * MALES[ name ].iqr[ 1 ] + genderProbs.female * FEMALES[ name ].iqr[ 1 ];
		return stats;
	}

} // end FUNCTION retrieve()


// EXPORTS //

module.exports = retrieve;
