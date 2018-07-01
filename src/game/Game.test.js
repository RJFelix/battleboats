import Game, { States } from './Game';

describe('Game class', () => {
  it('Should begin a game', () => {
    const game = new Game();
    game.beginGame();
    expect(game.state).toEqual(States.BeginTurn);
    expect(game.players.length).toEqual(2);
  });
  it('Should let us shoot', () => {
    const game = new Game();
    game.beginGame();
    game.play();
    const result = game.shoot(2, { x: 0, y: 0 });
    expect(game.state).toEqual(States.BeginTurn);
    expect(result.x).toEqual(0);
    expect(result.y).toEqual(0);
    expect(result.hit).toBeDefined();
    expect(result.sunk).toEqual(false);
  });
  it('Should tell us we have hit', () => {
    const game = new Game();
    game.beginGame();
    game.play();
    const result = game.shoot(2, {
      x: game.players[1].ships[0].tiles[0].x + game.players[1].ships[0].location.x,
      y: game.players[1].ships[0].tiles[0].y + game.players[1].ships[0].location.y,
    });
    expect(result.hit).toEqual(true);
  })
  it('Should end the game when all of a players ships are sunk', () => {
    const game = new Game();
    game.beginGame();
    game.play();
    game.players[1].ships.forEach(ship => {
      ship.tiles.forEach(tile => {
        game.shoot(2, {
          x: tile.x + ship.location.x,
          y: tile.y + ship.location.y,
        });
      });
    });
    expect(game.state).toEqual(States.EndGame);
  });
})