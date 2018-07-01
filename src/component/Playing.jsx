import React from 'react';
import Board from './Board';
import Box from 'grommet/components/Box';

class Playing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      x: 0,
      y: 0,
    };
    this.handleOwnZoneClick = this.handleOwnZoneClick.bind(this);
    this.handleEnemyZoneClick = this.handleEnemyZoneClick.bind(this);
  }

  handleOwnZoneClick() {
    // TODO: not this.
    alert("Please don't shoot at your own ships!");
  }

  handleEnemyZoneClick(coords) {
    const shootAt = this.props.game.activePlayer === 1 ? 2 : 1;
    this.props.game.shoot(shootAt, coords);
  }

  render() {
    const game = this.props.game;
    const activePlayer = game.players.find(p => p.id === game.activePlayer);
    const otherPlayer = game.players.find(p => p.id !== game.activePlayer);
    return (
      <Box
        flex='false'
        full='horizontal'
        pad='medium'
        basis='full'
        alignContent='center'
        justify='center'
        align='center'
      >
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
      </Box>
    );
  }
}

export default Playing;