'use strict';

// ----- Requires ----- //

let express = require('express');
let Omx = require('node-omxplayer');

let Queue = require('./queue');


// ----- Setup ----- //

let app = express();
let player = Omx();
let queue = Queue();
app.locals.queue = queue;

player.on('error', console.error);


// ----- Routing ----- //

// Plays the file in omxplayer.
app.post('/play', (req, res) => {

	/* istanbul ignore if */
	if (player.running) {
		player.play();
	}

	res.sendStatus(200);

});

// Pauses the file in omxplayer.
app.post('/pause', (req, res) => {

	/* istanbul ignore if */
	if (player.running) {
		player.pause();
	}

	res.sendStatus(200);

});

// Skips to the next song in the queue.
app.post('/next', (req, res) => {

	let next = queue.next();

	if (next) {

		/* istanbul ignore if */
		if (player.running) {
			player.quit();
		}

		/* istanbul ignore next */
		player.newSource(next.url);

	}

	res.sendStatus(200);

});

// Skips to the previous song in the queue.
app.post('/previous', (req, res) => {

	let previous = queue.previous();

	if (previous) {

		/* istanbul ignore if */
		if (player.running) {
			player.quit();
		}

		/* istanbul ignore next */
		player.newSource(previous.url);

	}

	res.sendStatus(200);

});

// Catches error and sends 500.
/* istanbul ignore next */
app.use((err, req, res, next) => {

	console.error(err.stack);
	res.status(500).send('Something broke!');

});


// ----- Run ----- //

let server = app.listen(5000, () => {
	console.log('Running on 5000');
});


// ----- Exports ----- //

module.exports = {
	app: app,
	server: server
};
