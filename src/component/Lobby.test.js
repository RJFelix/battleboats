import React from 'react';
import ReactDOM from 'react-dom';
import Lobby from './Lobby';

describe('Lobby component', () => {
  it('should pass smoke test', () => {
    const mockGame = {
      beginGame: () => {},
    }
    const div = document.createElement('div');
    ReactDOM.render(<Lobby game={mockGame} />, div);
  });
});