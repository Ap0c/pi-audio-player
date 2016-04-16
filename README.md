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

## API

### HTTP

#### /play - *POST*

Sends a command for the player to begin playback of the current file.

#### /pause - *POST*

Sends a command for the player to pause playback of the current file.

#### /next - *POST*

Skips to the next song in the queue.

#### /previous - *POST*

Skips to the previous song in the queue.

#### /queue - *GET*, *PUT*, *DELETE*

- *GET* - Retrieves the current queue in JSON form:

```
{ "queue": [] }
```

where the first element is the currently playing item.

- *PUT* - Send a JSON request to add a series of items to the queue, in the format:

```
{ "queue": [] }
```

All items must have a `url` property.

- *DELETE* - Clears the current queue.

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
