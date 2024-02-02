class Log {
	static e(tag, msg, ...othermsg) {
		if (!tag || Log.FORCE_GLOBAL_TAG) tag = Log.GLOBAL_TAG;

		let str = `[${tag}] > ${msg}`;

		if (!Log.ENABLE_ERROR) {
			return;
		}

		if (console.error) {
			console.error(str, othermsg);
		} else if (console.warn) {
			console.warn(str, othermsg);
		} else {
			console.log(str, othermsg);
		}
	}

	static i(tag, msg, ...othermsg) {
		if (!tag || Log.FORCE_GLOBAL_TAG) tag = Log.GLOBAL_TAG;

		let str = `[${tag}] > ${msg}`;

		if (!Log.ENABLE_INFO) {
			return;
		}

		if (console.info) {
			console.info(str, othermsg);
		} else {
			console.log(str, othermsg);
		}
	}

	static w(tag, msg, ...othermsg) {
		if (!tag || Log.FORCE_GLOBAL_TAG) tag = Log.GLOBAL_TAG;

		let str = `[${tag}] > ${msg}`;

		if (!Log.ENABLE_WARN) {
			return;
		}

		if (console.warn) {
			console.warn(str, othermsg);
		} else {
			console.log(str, othermsg);
		}
	}

	static d(tag, msg, ...othermsg) {
		if (!tag || Log.FORCE_GLOBAL_TAG) tag = Log.GLOBAL_TAG;

		let str = `[${tag}] > ${msg}`;

		if (!Log.ENABLE_DEBUG) {
			return;
		}

		if (console.debug) {
			console.debug(str, othermsg);
		} else {
			console.log(str, othermsg);
		}
	}

	static v(tag, msg, ...othermsg) {
		if (!tag || Log.FORCE_GLOBAL_TAG) tag = Log.GLOBAL_TAG;

		let str = `[${tag}] > ${msg}`;

		if (!Log.ENABLE_VERBOSE) {
			return;
		}

		console.log(str, othermsg);
	}
}

Log.GLOBAL_TAG = "im-tag";
Log.FORCE_GLOBAL_TAG = false;
Log.ENABLE_ERROR = true;
Log.ENABLE_INFO = true;
Log.ENABLE_WARN = true;
Log.ENABLE_DEBUG = true;
Log.ENABLE_VERBOSE = true;

export default Log;