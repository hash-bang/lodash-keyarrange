lodash-keyarrange
=================
Lodash plugin to correctly sort the keys within an object.


Why
---

In JavaScript objects keys are generally stored in the order in whch they are created.

	var a = {};
	a.foo = 1;
	a.bar = 2;
	a.baz = 3;
	// a = { foo: 1, bar: 2, baz: 3 }

But sometimes we need to output the object with the keys correctly sorted.

This lodash mixin allows key rearrangement within an object - returning a new object.


Example usage
-------------

	var _  = require('lodash');
	_.mixin(require('lodash-keyarrange');

	var a = {foo: 'fooValue', bar: 'barValue', baz: 'bazValue'};

	console.log( _.keyArrange(a) );
	// Outputs { bar: 'barValue', baz: 'bazValue', foo: 'fooValue' }
