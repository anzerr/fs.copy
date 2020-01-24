
const copy = require('./index.js'),
	fs = require('fs.promisify'),
	hash = require('fs.hash'),
	remove = require('fs.remove'),
	assert = require('assert'),
	promise = require('promise.util');

fs.access('./node_modules/@anzerr/fs.remove').then(() => {
	return './node_modules/@anzerr/fs.remove';
}).catch(() => {
	return './node_modules/fs.remove';
}).then((file) => {
	return promise.measure(() => {
		return copy(file, './test', {max: 5}).then(() => {
			return Promise.all([
				hash(file, {raw: true, max: 5}),
				hash('./test', {raw: true, max: 5})
			]);
		}).then((res) => {
			for (let x in res) {
				for (let i in res[x]) {
					assert.equal(res[0][i], res[1][i]);
				}
			}
			return remove('./test');
		}).catch((err) => {
			console.log(err);
			remove('./test').then(() => {
				process.exit(1);
			});
		});
	});
}).then((res) => {
	console.log(`test finished in ${(res / 1e9).toFixed(2)}sec`);
});
