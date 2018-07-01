import React from 'react';

const BeginTurn = ({game}) => {
  let statusUpdate = <h2>The game is starting!</h2>
  if(game.moves.length > 0) {
    const lastMove = game.moves[game.moves.length - 1];
    if(lastMove.sunk) {
      statusUpdate = <h2>Player {game.activePlayer}'s ship was sunk! It was {lastMove.sunkDescription}.</h2>
    } else if(lastMove.hit) {
      statusUpdate = <h2>Player {game.activePlayer}'s ship was hit!</h2>
    } else {
      statusUpdate = <h2>Miss!</h2>
    }
  }
  return (
    <div>
      <h1>Player {game.activePlayer}'s Turn!</h1>
      {statusUpdate}
      <button onClick={() =>
        game.play()
      }>Begin Turn</button>
    </div>
  );
}

export default BeginTurn;