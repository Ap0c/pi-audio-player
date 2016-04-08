'use strict';

// ----- Requires ----- //

let express = require('express');


// ----- Setup ----- //

let app = express();


// ----- Routing ----- //

app.get('/', (res, rej) => {
	res.send('Hello world');
});


// ----- Run ----- //

app.listen(5000, () => {
	console.log('Running on 5000');
});
