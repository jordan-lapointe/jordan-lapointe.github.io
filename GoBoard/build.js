const browserify = require('browserify');
const tsify = require('tsify');
const babelify = require('babelify');

browserify()
	.add('src/index.ts')
	.plugin(tsify, {
		esModuleInterop: true, 
		target: 'ES6',
		paths: {"mini-signals": ["node_modules/resource-loader/typings/mini-signals.d.ts"]}
	})
	.transform(babelify, { extensions: ['.ts'] })
	.bundle()
	.on('error', function (error) { console.error(error.toString()); })
	.pipe(process.stdout);