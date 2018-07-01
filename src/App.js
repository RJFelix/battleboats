import React, { Component } from 'react';
import GameWrapper from './component/GameWrapper';
import Lobby from './component/Lobby';
import BeginTurn from './component/BeginTurn';
import Playing from './component/Playing';
import EndGame from './component/EndGame';

class App extends Component {
  render() {
    return (
      <GameWrapper
        lobby={Lobby}
        beginTurn={BeginTurn}
        playing={Playing}
        endGame={EndGame}
      />
    );
  }
}

export default App;
