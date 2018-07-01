import React from 'react';

const BeginTurn = ({game}) => (
  <div>
    <h1>Player {game.activePlayer}'s Turn!</h1>
    <button onClick={() =>
      game.play()
    }>Begin Turn</button>
  </div>
);

export default BeginTurn;