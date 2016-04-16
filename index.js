'use strict';

// ----- Requires ----- //

let player = Omx();
let app = require('./server')(player);
let http = require('http').Server(app);
let io = require('./socket')(http, player);


// ----- Run ----- //

http.listen(5000, () => {
	console.log('Running on 5000');
});
