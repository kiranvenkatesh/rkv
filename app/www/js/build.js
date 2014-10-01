var browserify = require('browserify'),
	stringify = require('stringify');

var bundle = browserify()
    .transform(stringify(['.hjs', '.html']))
    .add( './main.js' );


bundle.bundle().pipe( process.stdout );