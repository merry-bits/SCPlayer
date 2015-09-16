# SoundCloud Player
Search a song, display the SoundCloud search result and play a track.

Note: you need a SoundCloud client id for this to work.


## Solution
The index.html uses the PlaylistController to get tracks from the SoundCloud
API. As soon a tracks can be displayed they can be played using the
PlayController within the same scope. The PlayController uses a HTML audio
element to play the given download_url.


# Install and run it
- Install the [Node.js package manager](https://www.npmjs.com/)
- Clone/extract the project and cd into it, then run:
```
npm install -g grunt-cli
npm install
grunt file-creator:config --client-id=<YOUR SOUNDCLOUD CLIENT ID>
```
- open `index.html` and try it out!


## Run tests
Cd into the project and call:
```
grunt test
```

## Create documentation
Cd into the project and call:
```
grunt jsdoc
```
Then open `doc/index.html`


# Files
- **doc**: after calling `grunt jsdoc` contains the documentation
- **js**: contains the JS code
- **css**: contains the CSS
- **test**: contains the test scripts
- **index.html**: the main file
- **README.md**: this file

The other files are used to configure or contain the various tools.


# Tools
- **NPM**: installer for the other packages
- **Bower**: install front-end libraries
- **Grunt**: run tasks, like build the documentation
- **Karma**: run the tests
- **Jasmin**: test framework
- **Angular, jQuery, bootstrap**: used front-end libraries
