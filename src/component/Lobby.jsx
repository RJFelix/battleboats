import React from 'react';

const Lobby = game => (
  <div>
    <h1>Welcome to Battleboats!</h1>
    <button onClick={
      () => game.beginGame()
    }>Start!</button>
  </div>
)

export default Lobby;