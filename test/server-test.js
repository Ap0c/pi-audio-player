'use strict';

// ----- Requires ----- //

let expect = require('chai').expect;
let request = require('supertest');


// ----- Tests ----- //

describe('Server', function () {

	let firstQueue = [{ url: 1 }, { url: 2 }];
	let secondQueue = [{ url: 3 }, { url: 4 }];

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

	describe('queue movement', function () {

		let server = require('../index.js');

		before(function () {
			server.app.locals.queue.append(firstQueue);
		});

		after(function () {
			server.server.close();
		});

		it('should update the queue on /next', function (done) {

			request(server.server).post('/next').expect(200, () => {

				expect(server.app.locals.queue.get()[0]).to.eql(firstQueue[1]);
				done();

			});

		});

		it('should update the queue on /previous', function (done) {

			request(server.server).post('/previous').expect(200, () => {

				expect(server.app.locals.queue.get()).to.eql(firstQueue);
				done();

			});

		});

	});

	describe('queue route', function () {

		let server = require('../index.js');

		after(function () {
			server.server.close();
		});

		it('should get the queue on /queue', function (done) {

			request(server.server).get('/queue').expect(200, (err, res) => {

				if (err) throw err;
				expect(res.body.queue).to.eql([{ url: 1 }, { url: 2 }]);
				done();

			});

		});

		it('should put items into the queue on /queue', function (done) {

			let reqBody = { queue: secondQueue };

			request(server.server)
				.put('/queue')
				.set('Content-Type', 'application/json')
				.send(reqBody)
				.expect(201, (err, res) => {

				if (err) throw err;

				expect(server.app.locals.queue.get())
					.to.eql(firstQueue.concat(secondQueue));

				done();

			});

		});

		it('should give an error for /queue put without body', function (done) {

			request(server.server).put('/queue').expect(400, (err, res) => {

				if (err) throw err;

				expect(res.text).to.equal("Expected property 'queue'.");
				done();

			});

		});

		it('should give an error for incorrect queue items', function (done) {

			let reqBody = { queue: [{ a: 1 }] };

			request(server.server)
				.put('/queue')
				.set('Content-Type', 'application/json')
				.send(reqBody)
				.expect(400, (err, res) => {

				if (err) throw err;

				expect(res.text).to.equal("All items must have 'url' property.");
				done();

			});

		});

		it('should clear the queue on /queue delete', function (done) {

			request(server.server).delete('/queue').expect(200, (err, res) => {

				if (err) throw err;

				expect(server.app.locals.queue.get()).to.eql([]);
				done();

			});

		});

	});

});

