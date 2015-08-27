var _ = require('lodash');

function keyArrange(obj, callback) {
	var out = {};
	Object.keys(obj)
		.sort(callback || undefined)
		.forEach(function(k) { out[k] = obj[k] });
	return out;
};

function keyArrangeDeep(obj, callback) {
	if (_.isArray(obj)) {
		return _.map(obj, function(item) {
			return keyArrangeDeep(item, callback);
		});
	} else if (_.isObject(obj)) {
		var newObj = keyArrange(obj, callback);
		_.forEach(newObj, function(val, key) {
			newObj[key] = keyArrangeDeep(val);
		});
		return newObj;
	} else {
		return obj;
	}
};

module.exports = {
	keyArrange: keyArrange,
	keyArrangeDeep: keyArrangeDeep,
};
