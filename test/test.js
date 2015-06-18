var _ = require('lodash');
var keyArrange = require('..');
var expect = require('chai').expect;

describe('keyArrange - test #1', function() {
	var inObj = {foo: 'fooValue', bar: 'barValue', baz: 'bazValue'};
	var outObj;

	before(function() {
		_.mixin(keyArrange);
		outObj = _.keyArrange(inObj);
	});

	it('should sort the object keys correctly', function() {
		expect(outObj).to.be.an('object');
		expect(outObj).to.have.property('foo', 'fooValue');
		expect(outObj).to.have.property('bar', 'barValue');
		expect(outObj).to.have.property('baz', 'bazValue');

		var argOrder = [];
		_.forEach(outObj, function(v, k) { argOrder.push(k) });

		expect(argOrder).to.have.length(3);
		expect(argOrder).to.deep.equal(['bar', 'baz', 'foo']);
	});
});


describe('keyArrange - test #2', function() {
	var inObj = {_id: 123, name: 'Mr Foobar', age: 25, location: 'The World'};
	var outObj;

	before(function() {
		_.mixin(keyArrange);
		outObj = _.keyArrange(inObj);
	});

	it('should sort the object keys correctly', function() {
		expect(outObj).to.be.an('object');
		expect(outObj).to.have.property('_id', 123);
		expect(outObj).to.have.property('name', 'Mr Foobar');
		expect(outObj).to.have.property('age', 25);
		expect(outObj).to.have.property('location', 'The World');

		var argOrder = [];
		_.forEach(outObj, function(v, k) { argOrder.push(k) });

		expect(argOrder).to.have.length(4);
		expect(argOrder).to.deep.equal(['_id', 'age', 'location', 'name']);
	});
});


describe('keyArrange - test #3 (callbacks)', function() {
	var inObj = {_id: 123, name: 'Mr Foobar', age: 25, location: 'The World'};
	var outObj;

	before(function() {
		_.mixin(keyArrange);
		outObj = _.keyArrange(inObj, function(a, b) {
			if (a < b) {
				return 1;
			} else if (b < a) {
				return -1;
			} else {
				return 0;
			}
		});
	});

	it('should reverse sort the object keys correctly', function() {
		expect(outObj).to.be.an('object');
		expect(outObj).to.have.property('_id', 123);
		expect(outObj).to.have.property('name', 'Mr Foobar');
		expect(outObj).to.have.property('age', 25);
		expect(outObj).to.have.property('location', 'The World');

		var argOrder = [];
		_.forEach(outObj, function(v, k) { argOrder.push(k) });

		expect(argOrder).to.have.length(4);
		expect(argOrder).to.deep.equal(['name', 'location', 'age', '_id']);
	});
});
