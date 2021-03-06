'use strict';

// ----- Requires ----- //

let http = require('http');
let express = require('express');
let bodyParser = require('body-parser');
let Omx = require('node-omxplayer');

let Queue = require('./queue');
let socket = require('socket.io');

module.exports = function () {

	// ----- Setup ----- //

	let app = express();
	let server = http.Server(app);
	let io = socket(http);
	let player = Omx();
	let queue = Queue();
	let jsonParser = bodyParser.json();
	app.locals.queue = queue;


	// ----- Player ----- //

	player.on('error', (info) => {

		io.emit('error', info);
		console.error(info);

	});

	player.on('close', () => {

		let next = queue.next();

		if (next) {
			player.newSource(next.url);
		} else {
			queue.clear();
		}

	});


	// ----- Routing ----- //

	// Plays the file in omxplayer.
	app.post('/play', (req, res) => {

		/* istanbul ignore if */
		if (player.running) {
			player.play();
		}

		io.emit('play');
		res.sendStatus(200);

	});

	// Pauses the file in omxplayer.
	app.post('/pause', (req, res) => {

		/* istanbul ignore if */
		if (player.running) {
			player.pause();
		}

		io.emit('pause');
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

			player.newSource(next.url);

		}

		io.emit('skip');
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

			player.newSource(previous.url);

		}

		io.emit('previous');
		res.sendStatus(200);

	});

	// Handles interaction with the queue.
	app.route('/queue')
	.get((req, res) => {
		res.json({ queue: queue.get() });
	})
	.post(jsonParser, (req, res) => {

		let toAdd = req.body;

		if (!toAdd.queue) {
			return res.status(400).send("Expected property 'queue'.");
		}

		let queueLength = queue.get().length;
		let result = queue.append(toAdd.queue);

		if (!result) {
			res.status(400).send("All items must have 'url' property.");
		} else {

			/* istanbul ignore else */
			if (queueLength === 0) {
				player.newSource(queue.get()[0].url);
			}

			io.emit('queue-updated');
			res.sendStatus(201);

		}

	})
	.delete((req, res) => {

		queue.clear();
		io.emit('queue-cleared');
		res.sendStatus(200);

	});

	// Catches error and sends 500.
	/* istanbul ignore next */
	app.use((err, req, res, next) => {

		console.error(err.stack);
		res.status(500).send('Something broke!');

	});

	// ----- Constructor ----- //

	return { app: app, server: server };

};
