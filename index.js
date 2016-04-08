'use strict';

// ----- Requires ----- //

let express = require('express');
let Omx = require('node-omxplayer');

// ----- Setup ----- //

let app = express();
let player = Omx();


// ----- Routing ----- //

// Plays the file in omxplayer.
app.post('/play', (res, rej) => {
	player.play();
});

// Pauses the file in omxplayer.
app.post('/pause', (res, rej) => {
	player.pause();
});


// ----- Run ----- //

app.listen(5000, () => {
	console.log('Running on 5000');
});
