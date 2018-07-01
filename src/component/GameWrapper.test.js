import React from 'react';
import ReactDOM from 'react-dom';
import GameWrapper from './GameWrapper';

const EmptyComponent = () => <div />;

describe('GameWrapper component', () => {
  it('should pass smoke test', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <GameWrapper
        lobby={EmptyComponent}
        beginTurn={EmptyComponent}
        playing={EmptyComponent}
        endGame={EmptyComponent}
      />, div
    );
  })
})
