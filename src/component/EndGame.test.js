import React from 'react';
import ReactDOM from 'react-dom';
import EndGame from './EndGame';

describe('EndGame component', () => {
  it('should pass smoke test', () => {
    const mockGame = {
      activePlayer: 1,
      finish: () => {},
    };
    const div = document.createElement('div');
    ReactDOM.render(<EndGame game={mockGame} />, div);
  });
});