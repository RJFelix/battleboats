import React from 'react';
import ReactDOM from 'react-dom';
import Playing from './Playing';
import Game from '../game/Game';

describe('Playing component', () => {
  it('should pass smoke test', () => {
    // we do need a real game here
    // (or, rather, mocking one is more trouble than it's worth)
    const game = new Game();
    game.beginGame();
    game.play();
    const div = document.createElement('div');
    ReactDOM.render(<Playing game={game} />, div);
  })
})