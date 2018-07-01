# Battleboats!

A 2-player battleship game - with a twist!

## Game Rules

It's like the classic game Battleship - but the ships are Tetris blocks!

Each player gets four boats:

* 2 Canoes - four tiles in a line, horizontally or vertically
* The Party Raft - a 2x2 square
* The El-Boat - an "L" shape

When it's your turn, click on an enemy tile to fire. You'll be told if you hit or miss - and if you sunk a boat, which one!

## Areas for Improvement

1. Link each boat's tiles. The boats are usually adjacent to one another, and with the tiles just filled/unfilled, it's super ugly. I really wanted to fix this (and still might), but I ran out of time.
2. Add some nice CSS transitions between states. It's kind of jarring without them. Getting transitions right with React is a bit of a time sink, though. I'd probably have components slide in/out of the side of the screen, like in my [PomoTada!](https://github.com/RJFelix/pomotada) project.
3. Give it some visual pizzazz. Maybe have the canoes have rounded edges or the Party Raft look like a raft. Use Grommet's neat data visualization tools in the post-game summary.
4. There's lots of opportunties for refactoring. I came to regret handling players by ID rather than index into the `game.players` array, for example.
5. Extract game configuration, such as boat shapes, into external files, linked at compile time. (This would require ejecting from `create-react-app`.)
6. Mobile views. I doubt this is usable on mobile. I'm afraid to even try...

## Installation

You must have `node` and `npm` installed to build this app.

This app was bootstrapped with `create-react-app`, so it has all of the standard commands.

1. Clone this repository
2. `npm install`

## Running Tests

`npm run test` begins tests with Jest in watch mode

Many things are tested, though test coverage can always be improved.

## Running locally

`npm run start` will build the project, with hot updates enabled. A browser window should open, pointed at `localhost:3000`.

## Building

`npm run build` will produce a build artifact in the `/build` directory.

## Deploying to GitHub Pages

This project can be automatically deployed to GitHub Pages. In `package.json`, change `homepage` to your fork's GitHub Pages homepage. Then run `npm run deploy`.
