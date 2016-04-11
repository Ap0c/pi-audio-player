'use strict';

// ----- Requires ----- //

let app = require('./server')();
let http = require('http').Server(app);
let io = require('./socket')(http);


// ----- Run ----- //

http.listen(5000, () => {
	console.log('Running on 5000');
});
