import _ from 'lodash';
import keyArrange from '../index.js';
import {expect} from 'chai';

describe('keyArrangeDeep - same as keyArrange', function() {
	let inObj = {foo: 'fooValue', bar: 'barValue', baz: 'bazValue'};
	let outObj;

	before(function() {
		_.mixin(keyArrange);
		outObj = _.keyArrangeDeep(inObj);
	});

	it('should sort the object keys correctly', function() {
		expect(outObj).to.be.an('object');
		expect(outObj).to.have.property('foo', 'fooValue');
		expect(outObj).to.have.property('bar', 'barValue');
		expect(outObj).to.have.property('baz', 'bazValue');

		expect(_.keys(outObj)).to.have.length(3);
		expect(_.keys(outObj)).to.deep.equal(['bar', 'baz', 'foo']);
	});
});


describe('keyArrangeDeep - trees', function() {
	let inObj = {
		foo: 'fooValue',
		bar: {
			foo: 'barFooValue',
			bar: 'barBarValue',
			baz: {
				foo: {
					foo: 'barBazFooFooValue',
					bar: 'barBazFooBarValue',
					baz: 'barBazFooBazValue',
				},
				bar: 'barBazBarValue',
				baz: 'barBazBazValue',
			},
		},
		baz: 'bazValue',
	};
	let outObj;

	before(function() {
		_.mixin(keyArrange);
		outObj = _.keyArrangeDeep(inObj);
	});

	it('should sort the 1st level object keys correctly', function() {
		expect(outObj).to.be.an('object');
		expect(outObj).to.have.property('foo', 'fooValue');
		expect(outObj).to.have.property('bar');
		expect(outObj).to.have.property('baz', 'bazValue');

		expect(_.keys(outObj)).to.have.length(3);
		expect(_.keys(outObj)).to.deep.equal(['bar', 'baz', 'foo']);
	});

	it('should sort the 2nd level object keys correctly', function() {
		expect(outObj.bar).to.be.an('object');
		expect(outObj.bar).to.have.property('foo', 'barFooValue');
		expect(outObj.bar).to.have.property('bar', 'barBarValue');
		expect(outObj.bar).to.have.property('baz');

		expect(_.keys(outObj.bar)).to.have.length(3);
		expect(_.keys(outObj.bar)).to.deep.equal(['bar', 'baz', 'foo']);
	});

	it('should sort the 3rd level object keys correctly', function() {
		expect(outObj.bar.baz).to.be.an('object');
		expect(outObj.bar.baz).to.have.property('foo');
		expect(outObj.bar.baz).to.have.property('bar', 'barBazBarValue');
		expect(outObj.bar.baz).to.have.property('baz', 'barBazBazValue');

		expect(_.keys(outObj.bar.baz)).to.have.length(3);
		expect(_.keys(outObj.bar.baz)).to.deep.equal(['bar', 'baz', 'foo']);
	});

	it('should sort the final level object keys correctly', function() {
		expect(outObj.bar.baz.foo).to.be.an('object');
		expect(outObj.bar.baz.foo).to.have.property('foo', 'barBazFooFooValue');
		expect(outObj.bar.baz.foo).to.have.property('bar', 'barBazFooBarValue');
		expect(outObj.bar.baz.foo).to.have.property('baz', 'barBazFooBazValue');
	});
});


describe('keyArrangeDeep - mixed types', function() {
	let inObj = {
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
		zeta: null,
		si: {
			theta: 999,
			eta: 'value!',
		},
		beta: 'hello world',
	};
	let outObj;

	before(function() {
		_.mixin(keyArrange);
		outObj = _.keyArrangeDeep(inObj);
	});

	it('should sort the deep object keys correctly', function() {
		expect(outObj).to.be.an('object');
		expect(outObj).to.have.property('alpha', 123);
		expect(outObj).to.have.property('beta', 'hello world');
		expect(outObj).to.have.property('gamma');
		expect(outObj).to.have.property('si');

		expect(_.keys(outObj)).to.have.length(5);
		expect(_.keys(outObj)).to.deep.equal(['alpha', 'beta', 'gamma', 'si', 'zeta']);

		expect(outObj.gamma).to.be.an('array');
		expect(outObj.gamma).to.have.length(3);
		expect(outObj.gamma[0]).to.be.an('object');
		expect(_.keys(outObj.gamma[0])).to.deep.equal(['gammaFoo', 'omegaValue']);
		expect(outObj.gamma[0]).to.have.property('gammaFoo', 'gammaFooValue');
		expect(outObj.gamma[0]).to.have.property('omegaValue', 123);

		expect(_.keys(outObj.gamma[1])).to.deep.equal(['kappa']);
		expect(outObj.gamma[1]).to.be.an('object');
		expect(outObj.gamma[1]).to.have.property('kappa');
		expect(outObj.gamma[1].kappa).to.be.an('object');
		expect(outObj.gamma[1].kappa).to.have.property('gammaKappaBaz', 'hello');

		expect(outObj.gamma[2]).to.be.an('number');
		expect(outObj.gamma[2]).to.be.equal(1337);

		expect(outObj.si).to.be.an('object');
		expect(outObj.si).to.have.property('eta', 'value!');
		expect(outObj.si).to.have.property('theta', 999);
		expect(_.keys(outObj.si)).to.deep.equal(['eta', 'theta']);

		expect(outObj.zeta).to.equal(null)
	});
});
