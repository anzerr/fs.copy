
### `Intro`
![GitHub Actions status | linter](https://github.com/anzerr/fs.copy/workflows/linter/badge.svg)
![GitHub Actions status | publish](https://github.com/anzerr/fs.copy/workflows/publish/badge.svg)
![GitHub Actions status | test](https://github.com/anzerr/fs.copy/workflows/test/badge.svg)

Copy a directory or file to a location

#### `Install`
``` bash
npm install --save git+https://git@github.com/anzerr/fs.copy.git
npm install --save @anzerr/fs.copy
```

### `Example`
``` javascript
const copy = require('fs.copy');

copy('./node_modules', './stuff').then(() => {
	console.log('done');
}).catch((err) => {
	console.log(err);
});
```