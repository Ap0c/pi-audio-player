# Pi Audio Player

Network audio file player designed to run on the Raspberry Pi, using omxplayer.

## Install

Download a copy of the repo and run:

```
npm install --production
```

This module relies on omxplayer being installed. On the default version of Raspbian it is installed by default, but on the Lite version you will have to install it:

```
sudo apt-get install omxplayer
```

## Run

In the repo directory run:

```
npm start`
```

and the server will start on port 5000.

## HTTP API

### /play

**POST** - *200 on success.*

Sends a command for the player to begin playback of the current file.

### /pause - *POST*

**POST** - *200 on success.*

Sends a command for the player to pause playback of the current file.

### /next - *POST*

**POST** - *200 on success.*

Skips to the next song in the queue.

### /previous - *POST*

**POST** - *200 on success.*

Skips to the previous song in the queue.

### /queue

**GET** - *200 on success.*

Retrieves the current queue in JSON form:

```
{ "queue": [] }
```

where the first element is the currently playing item.

**POST** - *201 on success, 400 on request problem.*

Send a JSON request to add a series of items to the queue, in the format:

```
{ "queue": [] }
```

All items must have a `url` property.

**DELETE** - *200 on success.*

Clears the current queue.

## Websocket Events (socket.io)

### play

Signifies that a command has been sent to the server to start playback.

### pause

Signifies that a command has been sent to the server to pause playback.

### skip

Signifies that a command has been sent to the server to skip to the next item in the queue.

### previous

Signifies that a command has been sent to the server to return to the previous item in the queue.

### queue-updated

Signifies that the queue has been updated with new items.

### queue-cleared

Signifies that the queue has been cleared.

### error

Signifies an error on the server end, includes a message explaining the error.

## Development

To install the dev dependencies run:

```
npm install
```

### Test

To run the mocha-based test suite, run:

```
npm test
```
