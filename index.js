var framework = require('partial.js');
var http = require('http');

var port = parseInt(process.argv[2] || '8888', 10);
var debug = true;

framework.run(http, debug, port);