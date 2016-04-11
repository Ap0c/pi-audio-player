'use strict';

// ----- Requires ----- //

let io = require('socket.io');


// ----- Exports ----- //

module.exports = function Socket (http) {

	// ----- Setup ----- //

	let server = io(http);


	// ----- Events ----- //

	server.on('connection', () => {

	});


	// ----- Constructor ----- //

	return server;

};
