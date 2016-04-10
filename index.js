'use strict';

// ----- Requires ----- //

let server = require('./server');


// ----- Setup ----- //

let app = server();


// ----- Run ----- //

app.listen(5000, () => {
	console.log('Running on 5000');
});
