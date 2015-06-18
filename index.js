function keyArrange(obj, callback) {
	var out = {};
	Object.keys(obj)
		.sort(callback || undefined)
		.forEach(function(k) { out[k] = obj[k] });
	return out;
};

module.exports = {
	keyArrange: keyArrange,
};
