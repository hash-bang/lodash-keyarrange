export function keyArrange(obj, callback) {
	return Object.fromEntries(
		Object.entries(obj)
			.sort(callback || undefined)
			.map(([k, v]) => [k, v])
	);
};

export function keyArrangeDeep(obj, callback) {
	if (Array.isArray(obj)) {
		return obj.map(v => keyArrangeDeep(v, callback));
	} else if (typeof obj == 'object') {
		if (obj == null) {
			return null;
		}
		return Object.fromEntries(
			Object.entries(
				keyArrange(obj, callback)
			)
			.map(([k, v]) => [k, keyArrangeDeep(v, callback)])
		)
	} else { // Everything else - Assume a scalar
		return obj;
	}
};

export default {
	keyArrange,
	keyArrangeDeep,
};
