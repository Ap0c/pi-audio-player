'use strict';

module.exports = function Queue () {

	// ----- Setup ----- //

	let queue = [];
	let nowPlaying = null;


	// ----- Functions ----- //

	// Adds an item to queue if valid and returns true, else returns false.
	function push (items) {

		let toQueue = [];

		for (let item of items) {

			if (item.hasOwnProperty('url')) {
				toQueue.push(item);
			} else {
				return false;
			}

		}

		queue = queue.concat(toQueue);
		return true;

	}

	// Returns the next song, or null.
	function next () {

		if (nowPlaying < queue.length - 1) {

			nowPlaying++;
			return queue[nowPlaying];

		}

		return null;

	}

	// Returns the previous song, or null.
	function previous () {

		if (nowPlaying > 0) {

			nowPlaying--;
			return queue[nowPlaying];

		}

		return null;

	}

	// Clears the queue.
	function clear () {

		queue = [];
		nowPlaying = null;

	}

	// Adds items to the play queue.
	function append (items) {

		if (Array.isArray(items)) return push(items);

		return push([items]);

	}

	// Returns the up next items from the queue, including the now playing item.
	function get () {
		return queue.slice(nowPlaying);
	}

	// ----- Constructor ----- //

	return {
		next: next,
		previous: previous,
		clear: clear,
		append: append,
		get: get
	};

};
