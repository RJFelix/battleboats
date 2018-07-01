import React from 'react';

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