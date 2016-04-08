'use strict';

// ----- Requires ----- //

let express = require('express');
let Omx = require('node-omxplayer');

// ----- Setup ----- //

let app = express();
let player = Omx();


// ----- Routing ----- //

// Plays the file in omxplayer.
app.post('/play', (req, res) => {

	if (player.running) {
		/* istanbul ignore next */
		player.play();
	}

	res.sendStatus(200);

});

// Pauses the file in omxplayer.
app.post('/pause', (req, res) => {

	if (player.running) {
		/* istanbul ignore next */
		player.pause();
	}

	res.sendStatus(200);

});


// ----- Run ----- //

let server = app.listen(5000, () => {
	console.log('Running on 5000');
});


// ----- Exports ----- //

module.exports = server;
