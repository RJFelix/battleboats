# Battleboats!

A 2-player battleship game - with a twist!

## Game Rules

It's like the classic game Battleship - but the ships are Tetris blocks!

Each player gets four boats:

* 2 Canoes - four tiles in a line, horizontally or vertically
* The Party Raft - a 2x2 square
* The El-Boat - an "L" shape

When it's your turn, click on an enemy tile to fire. You'll be told if you hit or miss - and if you sunk a boat, which one!

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
