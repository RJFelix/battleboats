import React from 'react';
import Board from './Board';

class Playing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      x: 0,
      y: 0,
    };
    this.handleXChange = this.handleXChange.bind(this);
    this.handleYChange = this.handleYChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleOwnZoneClick = this.handleOwnZoneClick.bind(this);
    this.handleEnemyZoneClick = this.handleEnemyZoneClick.bind(this);
  }

  handleXChange(e) {
    e.stopPropagation();
    this.setState({
      x: parseInt(e.target.value, 10),
    });
  }

  handleYChange(e) {
    e.stopPropagation();
    this.setState({
      y: parseInt(e.target.value, 10),
    });
  }

  handleOwnZoneClick() {
    // TODO: not this.
    alert("Please don't shoot at your own ships!");
  }

  handleEnemyZoneClick(coords) {
    const shootAt = this.props.game.activePlayer === 1 ? 2 : 1;
    this.props.game.shoot(shootAt, coords);
  }

  handleSubmit(e) {
    e.stopPropagation();
    const shootAt = this.props.game.activePlayer === 1 ? 2 : 1;
    this.props.game.shoot(shootAt, this.state);
  }

  render() {
    const game = this.props.game;
    const activePlayer = game.players.find(p => p.id === game.activePlayer);
    const otherPlayer = game.players.find(p => p.id !== game.activePlayer);
    return (
      <div>
        <h1>Make Your Move!</h1>
        <p>Enemy Zone</p>
        <Board
          player={otherPlayer}
          revealAll={false}
          onClick={this.handleEnemyZoneClick}
        />
        <p>Your Zone</p>
        <Board
          player={activePlayer}
          revealAll={true}
          onClick={this.handleOwnZoneClick}
        />
        <p>Shoot at...</p>
        <input type='number' onChange={this.handleXChange} />
        <input type='number' onChange={this.handleYChange} />
        <button onClick={this.handleSubmit}>Fire!</button>
      </div>
    );
  }
}

export default Playing;