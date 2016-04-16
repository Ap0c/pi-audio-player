'use strict';

// ----- Requires ----- //

let expect = require('chai').expect;
let request = require('supertest');
let server = require('../server');


// ----- Tests ----- //

describe('Server', function () {

	let dummyQueue = [{ url: 1 }, { url: 2 }];

	describe('omxplayer controls', function () {

		let app = server().app;
		let req = request(app);

		it('should respond with ok for /play', function (done) {

			req.post('/play').expect(200, done);

		});

		it('should respond with ok for /pause', function (done) {

			req.post('/pause').expect(200, done);

		});

		it('should respond with ok for empty /next', function (done) {

			req.post('/next').expect(200, done);

		});

		it('should respond with ok for empty /previous', function (done) {

			req.post('/previous').expect(200, done);

		});

	});

	describe('queue movement', function () {

		it('should update the queue on /next', function (done) {

			let app = server().app;
			let req = request(app);
			app.locals.queue.append(dummyQueue);

			req.post('/next').expect(200, () => {

				expect(app.locals.queue.get()[0]).to.eql(dummyQueue[1]);
				done();

			});

		});

		it('should update the queue on /previous', function (done) {

			let app = server().app;
			let req = request(app);
			app.locals.queue.append(dummyQueue);
			app.locals.queue.next();

			req.post('/previous').expect(200, () => {

				expect(app.locals.queue.get()).to.eql(dummyQueue);
				done();

			});

		});

	});

	describe('queue route', function () {

		it('should get the queue on /queue', function (done) {

			let app = server().app;
			let req = request(app);
			app.locals.queue.append(dummyQueue);

			req.get('/queue').expect(200, (err, res) => {

				if (err) throw err;

				expect(res.body.queue).to.eql([{ url: 1 }, { url: 2 }]);
				done();

			});

		});

		it('should post items into the queue on /queue', function (done) {

			let app = server().app;
			let req = request(app);
			let reqBody = { queue: dummyQueue };

			req.post('/queue')
				.set('Content-Type', 'application/json')
				.send(reqBody)
				.expect(201, (err, res) => {

					if (err) throw err;

					let queue = app.locals.queue.get();
					expect(queue).to.eql(dummyQueue);
					done();

			});

		});

		it('should clear the queue on /queue delete', function (done) {

			let app = server().app;
			let req = request(app);

			req.delete('/queue').expect(200, (err, res) => {

				if (err) throw err;

				expect(app.locals.queue.get()).to.eql([]);
				done();

			});

		});

	});

	describe('queue errors', function () {

		let app = server().app;
		let req = request(app);

		it('should give an error for /queue post without body', function (done) {

			req.post('/queue').expect(400, (err, res) => {

				if (err) throw err;

				expect(res.text).to.equal("Expected property 'queue'.");
				done();

			});

		});

		it('should give an error for incorrect queue items', function (done) {

			let reqBody = { queue: [{ a: 1 }] };

			req.post('/queue')
				.set('Content-Type', 'application/json')
				.send(reqBody)
				.expect(400, (err, res) => {

					if (err) throw err;

					let errMessage = "All items must have 'url' property.";
					expect(res.text).to.equal(errMessage);
					done();

			});

		});

	});

});

