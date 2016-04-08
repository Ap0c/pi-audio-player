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

});
