import React from 'react';
import ReactDOM from 'react-dom';
import BeginTurn from './BeginTurn';

describe('BeginTurn component', () => {
  it('should pass smoke test', () => {
    const mockGame = {
      play: () => {},
    }
    const div = document.createElement('div');
    ReactDOM.render(<BeginTurn game={mockGame} />, div);
  });
});