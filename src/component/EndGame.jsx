import React from 'react';

const EndGame = ({game}) => {
  const totalShotsFired = game.moves.length;
  const totalHits = game.moves.reduce((sum, move) => move.hit ? sum + 1 : sum, 0);
  const percentHits = Math.floor((totalHits / totalShotsFired) * 100);
  const shipsSunk = game.moves.filter(move => move.sunk);
  return (
    <div>
      <h1>Game Over</h1>
      <h2>Player {game.activePlayer} won.</h2>
      <p>Total Shots Fired: {totalShotsFired}</p>
      <p>Total Hits: {totalHits} ({percentHits}%)</p>
      <p>Ships Sunk:</p>
      <p>Player 1</p>
      <ul>{shipsSunk.filter(move => move.target === 1).map(move =>
        <li key={`p1-${move.x},${move.y}`}>{move.sunkDescription}</li>
      )}</ul>
      <p>Player 2</p>
      <ul>{shipsSunk.filter(move => move.target === 2).map(move =>
        <li key={`p2-${move.x},${move.y}`}>{move.sunkDescription}</li>
      )}</ul>
      <button onClick={() => game.finish()}>Return to Lobby</button>
    </div>
  );
};

export default EndGame;