import React from 'react';
import Game, { States } from '../game/Game';

class GameWrapper extends React.Component {

  constructor(props) {
    super(props);
    this.handleStateChange = this.handleStateChange.bind(this);
    this.game = new Game();
    this.game.onStateChange(this.handleStateChange);
    this.lobbyComponent = props.lobby;
    this.beginTurnComponent = props.beginTurn;
    this.playingComponent = props.playing;
    this.endGameComponent = props.endGame;
    this.state = {
      gameState: this.game.state,
      activePlayer: null,
    }
  }

  handleStateChange(newGameState, activePlayer) {
    this.setState({
      gameState: newGameState,
      activePlayer,
    });
  }

  getComponentToRender() {
    switch(this.state.gameState) {
      case States.Lobby:
        const Lobby = this.props.lobby;
        return <Lobby game={this.game} />;
      case States.BeginTurn:
        const BeginTurn = this.props.beginTurn;
        return <BeginTurn game={this.game} />;
      case States.Playing:
        const Playing = this.props.playing;
        return <Playing game={this.game} />;
      case States.EndGame:
        const EndGame = this.props.endGame;
        return <EndGame game={this.game} />;
      default:
        return <div><p>An error occurred, oh no!</p></div>
    }
  }

  render() {
    console.log(this.game);
    return (
      <div>
        <h1>State: {this.state.gameState}</h1>
        <h2>Active Player: {this.state.activePlayer}</h2>
        {this.getComponentToRender()}
      </div>
    );
  }
}

export default GameWrapper;