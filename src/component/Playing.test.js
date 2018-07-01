import React from 'react';
import ReactDOM from 'react-dom';
import Playing from './Playing';

describe('Playing component', () => {
  it('should pass smoke test', () => {
    const mockGame = {
      activePlayer: 1,
      shoot: () => {},
    };
    const div = document.createElement('div');
    ReactDOM.render(<Playing game={mockGame} />, div);
  })
})