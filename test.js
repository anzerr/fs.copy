
const copy = require('./index.js'),
	hash = require('fs.hash'),
	remove = require('fs.remove'),
	assert = require('assert');

copy('./node_modules', './stuff').then(() => {
	return Promise.all([
		hash('./node_modules', true),
		hash('./stuff', true)
	]);
}).then((res) => {
	for (let i in res[0]) {
		assert.equal(res[0][i], res[1][i.replace(/^node_modules/, 'stuff')]);
	}
	return remove('./stuff');
}).catch((err) => {
	console.log(err);
	remove('./stuff').then(() => {
		process.exit(1);
	});
});
