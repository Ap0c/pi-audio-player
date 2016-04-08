'use strict';

// ----- Requires ----- //

let expect = require('chai').expect;
let request = require('supertest');


// ----- Tests ----- //

describe('Server', function () {

	let server = null;

	beforeEach(function () {
		server = require('../index.js');
	});

	afterEach(function () {
		server.close();
	});

	describe('omxplayer controls', function () {

		it('should respond with ok for /play', function (done) {

			request(server).post('/play').expect(200, done);

		});

		it('should respond with ok for /pause', function (done) {

			request(server).post('/pause').expect(200, done);

		});

	});

});

