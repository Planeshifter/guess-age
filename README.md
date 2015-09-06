[![NPM version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]
[![Coverage Status][coveralls-image]][coveralls-url]
[![Dependencies][dependencies-image]][dependencies-url]

guess-age
==========

> Guess the age of a person only from their first name.

## Installation

``` bash
$ npm install guess-age
```

For use in the browser, use [browserify](https://github.com/substack/node-browserify).


## Usage

``` javascript
var guess = require( 'guess-age' );
```

#### guess( name[, gender] )

Retrieves the [median](https://en.wikipedia.org/wiki/Median) and [interquartile range](https://en.wikipedia.org/wiki/Interquartile_range) of the age of all persons with a certain `name` estimated to be currently living in the US.

```javascript
var out;

out = guess( 'Noah' );
/*
	{
		median: 9,
		iqr: [ 4, 15.004656730414027 ]
	}
*/

out = guess( 'Jack' );
/*
	{
		median: 50.04038167193148,
		iqr: [ 11.092877845442404, 70.04441983912463 ]
	}
*/
```

Since some names can be given to both boys and girls, there is some ambiguity in the gender associated with a `name`. The function supports an optional gender argument which should be used if the `gender` is known. If the `gender` argument is omitted, the statistics are calculated separately for each gender group and then a weighted average is computed based on the distribution of the two genders for persons with the name in question.

```javascript
out = guess( 'Lindsay', 'male' );
/*
	{
		iqr: [ 35, 62 ],
		median: 53
	}
*/

out = guess( 'Lindsay', 'female' );
/*
	{
		iqr: [ 21, 32 ],
		median: 27
	}
*/
```

## Reference 

See the article on [FiveThirtyEight](http://fivethirtyeight.com/features/how-to-tell-someones-age-when-all-you-know-is-her-name/) which was the inspiration for this module.  The statistics are based on data collected by the Social Security Administration, namely their [actuarial tables](http://www.ssa.gov/oact/NOTES/as120/LifeTables_Tbl_7.html) and data on [birth](https://github.com/datasets-io/male-first-names-us-frequency) [frequencies](https://github.com/datasets-io/female-first-names-us-frequency). 

## Examples

``` javascript
var guess = require( 'guess-age' ),
	out;

// Statistics for Herbert:
out = guess( 'Herbert' );

// Statistics for Jason:
out = guess( 'Jason' );

// Statistics for Connor:
out = guess( 'Connor' );
```

To run the example code from the top-level application directory,

``` bash
$ node ./examples/index.js
```



## Tests

### Unit

Unit tests use the [Mocha](http://mochajs.org) test framework with [Chai](http://chaijs.com) assertions. To run the tests, execute the following command in the top-level application directory:

``` bash
$ make test
```

All new feature development should have corresponding unit tests to validate correct functionality.


### Test Coverage

This repository uses [Istanbul](https://github.com/gotwarlost/istanbul) as its code coverage tool. To generate a test coverage report, execute the following command in the top-level application directory:

``` bash
$ make test-cov
```

Istanbul creates a `./reports/coverage` directory. To access an HTML version of the report,

``` bash
$ make view-cov
```


---
## License

[MIT license](http://opensource.org/licenses/MIT).

[npm-image]: https://badge.fury.io/js/guess-age.svg
[npm-url]: http://badge.fury.io/js/guess-age

[travis-image]: https://travis-ci.org/Planeshifter/guess-age.svg
[travis-url]: https://travis-ci.org/Planeshifter/guess-age

[coveralls-image]: https://img.shields.io/coveralls/Planeshifter/guess-age/master.svg
[coveralls-url]: https://coveralls.io/r/Planeshifter/guess-age?branch=master

[dependencies-image]: http://img.shields.io/david/Planeshifter/guess-age.svg
[dependencies-url]: https://david-dm.org/Planeshifter/guess-age
