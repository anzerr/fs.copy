
const fs = require('fs.promisify'),
	mkdir = require('fs.mkdirp'),
	is = require('type.util'),
	path = require('path');

const copy = (dir, out) => {
	if (!is.string(dir) || !is.string(out)) {
		return Promise.reject(new Error('invalid param'));
	}
	return fs.access(dir).then(async () => {
		let res = await fs.stat(dir);
		if (res.isDirectory()) {
			await mkdir(out);
			let list = await fs.readdir(dir), wait = [];
			for (let i in list) {
				wait.push(copy(path.join(dir, list[i]), path.join(out, list[i])));
			}
			return Promise.all(wait);
		}
		return fs.copyFile(dir, out);
	});
};

module.exports = copy;
