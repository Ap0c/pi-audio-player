'use strict';

// ----- Requires ----- //

let expect = require('chai').expect;
let Queue = require('../queue.js');


// ----- Tests ----- //

describe('Queue', function () {

	let queue = null;

	describe('#append', function () {

		beforeEach(function () {
			queue = Queue();
		});

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

});
