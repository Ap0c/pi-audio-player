'use strict';

// ----- Requires ----- //

let expect = require('chai').expect;
let Queue = require('../queue.js');


// ----- Tests ----- //

describe('Queue', function () {

	let queue = null;

	beforeEach(function () {
		queue = Queue();
	});

	describe('#get', function () {

		it('should retrieve the upcoming items in the queue', function () {

			let upcoming = queue.get();
			expect(upcoming).to.eql([]);

		});

	});

	describe('#append', function () {

		it('should add an item to the queue', function () {

			let toAppend = { a: 1, b: 2 };
			queue.append(toAppend);

			let items = queue.get();
			expect(items).to.eql([toAppend]);

		});

		it('should append multiple items to the queue', function () {

			let toAppend = [{ a: 1 }, { b: 2 }];
			queue.append(toAppend);

			let items = queue.get();
			expect(items).to.eql(toAppend);

		});

	});

	describe('#clear', function () {

		it('should clear the items in the queue', function () {

			let toAppend = [{ a: 1 }, { b: 2 }];
			queue.append(toAppend);

			queue.clear();

			let items = queue.get();
			expect(items).to.eql([]);

		});

	});

	describe('#next', function () {

		it('should return null for an empty queue', function () {

			let result = queue.next();
			expect(result).to.be.null;

		});

		it('should return the next value in the queue', function () {

			let toAppend = [{ a: 1 }, { b: 2 }];
			queue.append(toAppend);

			let next = queue.next();
			expect(next).to.eql(toAppend[1]);

		});

		it('should return null once at the end of the queue', function () {

			let toAppend = [{ a: 1 }, { b: 2 }];
			queue.append(toAppend);

			queue.next();
			let next = queue.next();
			expect(next).to.be.null;

		});

	});

});
