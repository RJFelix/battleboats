import React from 'react';

class Playing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      x: 0,
      y: 0,
    };
  }

  handleXChange(e) {
    e.stopPropagation();
    this.setState({
      x: e.value,
    });
  }

  handleYChange(e) {
    e.stopPropagation();
    this.setState({
      y: e.value,
    });
  }

  handleSubmit(e) {
    e.stopPropagation();
    const shootAt = this.props.game.activePlayer === 1 ? 2 : 1;
    this.props.game.shoot(shootAt, this.state);
  }

  render() {
    return (
      <div>
        <h1>Make Your Move!</h1>
        <p>Shoot at...</p>
        <input type='number' onChange={this.handleXChange} />
        <input type='number' onChange={this.handleYChange} />
        <button onClick={this.handleSubmit}>Fire!</button>
      </div>
    );
  }
}

export default Playing;