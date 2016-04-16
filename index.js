'use strict';

// ----- Requires ----- //

let server = require('./server')().server;


// ----- Run ----- //

server.listen(5000, '0.0.0.0', () => {
	console.log('Running on 5000');
});
