import React from 'react';

const EndGame = game => (
  <div>
    <h1>Game Over</h1>
    <p>Player ${game.activePlayer} won.</p>
    <button onClick={() => game.finish()}>Return to Lobby</button>
  </div>
);

export default EndGame;