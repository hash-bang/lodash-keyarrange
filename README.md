lodash-keyarrange
=================
Lodash plugin to correctly sort the keys within an object.


Why
---

In JavaScript objects keys are generally stored in the order in which they are created. [ES6 formalizes this behaviour](http://www.ecma-international.org/ecma-262/6.0/#sec-ordinary-object-internal-methods-and-internal-slots-ownpropertykeys).

	var a = {};
	a.foo = 1;
	a.bar = 2;
	a.baz = 3;
	// a = { foo: 1, bar: 2, baz: 3 }

But sometimes we need to output the object with the keys correctly sorted.

This lodash mixin allows key rearrangement within an object - returning a new object.

You can also deep sort an object with `keyArrangeDeep()`.


Example usage
-------------

	var _ = require('lodash')
		.mixin(require('lodash-keyarrange'));

	var a = {foo: 'fooValue', bar: 'barValue', baz: 'bazValue'};

	console.log( _.keyArrange(a) );
	// Outputs { bar: 'barValue', baz: 'bazValue', foo: 'fooValue' }


You can also provide a custom sorter for the keys:

	// Example of reverse sorting keys
	var obj = {foo: 'fooValue', bar: 'barValue', baz: 'bazValue'};

	console.log( _.keyArrange(obj, function(a, b) {
		if (a < b) {
			return 1;
		} else if (b < a) {
			return -1;
		} else {
			return 0;
		}
	} ) );

	// Outputs { foo: 'fooValue', baz: 'bazValue', bar: 'barValue'  }


keyArrangeDeep()
----------------
It is also possible to traverse an object and arrange all keys. Scalars and array types are left unaltered but all objects will be run via the keyArrange function.

For Example:

	var _ = require('lodash')
		.mixin(require('lodash-keyarrange'));

	var out = _.keyArrangeDeep({
		gamma: [
			{
				omegaValue: 123,
				gammaFoo: 'gammaFooValue',
			},
			{
				kappa: {
					gammaKappaBaz: 'hello',
				},
			},
			1337,
		],
		alpha: 123,
		si: {
			theta: 999,
			eta: 'value!',
		},
		beta: 'hello world',
	});

	console.log(JSON.stringify(out, null, "\t"));

Will output:

	{
		"alpha": 123,
		"beta": "hello world",
		"gamma": [
			{
				"gammaFoo": "gammaFooValue",
				"omegaValue": 123
			},
			{
				"kappa": {
					"gammaKappaBaz": "hello"
				}
			},
			1337
		],
		"si": {
			"eta": "value!",
			"theta": 999
		}
	}
