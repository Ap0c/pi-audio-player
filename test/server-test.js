'use strict';

// ----- Requires ----- //

let expect = require('chai').expect;
let request = require('supertest');


// ----- Tests ----- //

describe('Server', function () {

	describe('omxplayer controls', function () {

		let server = null;

		beforeEach(function () {
			server = require('../index.js');
		});

		afterEach(function () {
			server.server.close();
		});

		it('should respond with ok for /play', function (done) {

			request(server.server).post('/play').expect(200, done);

		});

		it('should respond with ok for /pause', function (done) {

			request(server.server).post('/pause').expect(200, done);

		});

		it('should respond with ok for empty /next', function (done) {

			request(server.server).post('/next').expect(200, done);

		});

		it('should respond with ok for empty /previous', function (done) {

			request(server.server).post('/previous').expect(200, done);

		});

	});

	describe('queue management', function () {

		let server = require('../index.js');
		let toAppend = [{ url: 1 }, { url: 2 }];

		before(function () {
			server.app.locals.queue.append(toAppend);
		});

		after(function () {
			server.server.close();
		});

		it('should update the queue on /next', function (done) {

			request(server.server).post('/next').expect(200, () => {

				expect(server.app.locals.queue.get()[0]).to.eql(toAppend[1]);
				done();

			});

		});

		it('should update the queue on /previous', function (done) {

			request(server.server).post('/previous').expect(200, () => {

				expect(server.app.locals.queue.get()).to.eql(toAppend);
				done();

			});

		});

	});

});

