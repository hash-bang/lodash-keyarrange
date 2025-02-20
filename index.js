import _ from 'lodash';

export function keyArrange(obj, callback) {
	let out = {};
	Object.keys(obj)
		.sort(callback || undefined)
		.forEach(function(k) { out[k] = obj[k] });
	return out;
};

export function keyArrangeDeep(obj, callback) {
	if (_.isArray(obj)) {
		return _.map(obj, function(item) {
			return keyArrangeDeep(item, callback);
		});
	} else if (_.isObject(obj)) {
		let newObj = keyArrange(obj, callback);
		_.forEach(newObj, function(val, key) {
			newObj[key] = keyArrangeDeep(val);
		});
		return newObj;
	} else {
		return obj;
	}
};

export default {
	keyArrange: keyArrange,
	keyArrangeDeep: keyArrangeDeep,
};
