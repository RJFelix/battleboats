import Ship, { Shapes } from './Ship';

describe('Ship class', () => {
  it('Should construct a ship for each valid shape', () => {
    Object.values(Shapes).forEach(shape => {
      const ship = new Ship(shape);
      expect(ship).toHaveProperty('tiles');
      ship.tiles.forEach(tile => {
        expect(tile).toEqual(
          expect.objectContaining({
            x: expect.any(Number),
            y: expect.any(Number),
            hit: false,
          })
        );
      });
      expect(ship.alive).toBe(true);
      expect(ship.location.x).toBe(null);
      expect(ship.location.y).toBe(null);
    });
  });
  it('Should throw for an invalid shape', () => {
    expect(() => { new Ship('invalid shape'); }).toThrow();
  });
  it('Should place each shape of ship if the board is empty', () => {
    Object.values(Shapes).forEach(shape => {
      const ship = new Ship(shape);
      const ships = ship.place([], 7, 7);
      expect(ships.length).toBe(1);
      expect(ship.location.x).not.toBe(null);
      expect(ship.location.y).not.toBe(null);
    });
  });
  it('Should place four ships on the game board', () => {
    const ships = [
      new Ship(Shapes.Line),
      new Ship(Shapes.Line),
      new Ship(Shapes.Square),
      new Ship(Shapes.El),
    ];
    let placedShips = [];
    ships.forEach(ship => {
      placedShips = ship.place(placedShips, 7, 7);
    });
    // check for valid type & compliance with game board
    placedShips.forEach(ship => {
      expect(ship.location.x).toEqual(expect.any(Number));
      expect(ship.location.y).toEqual(expect.any(Number));
      ship.tiles.forEach(tile => {
        expect(ship.location.x + tile.x).toBeLessThanOrEqual(7);
        expect(ship.location.y + tile.y).toBeLessThanOrEqual(7);
      });
    });
    // check for collision
    const occupiedTiles = [];
    placedShips.forEach(ship => {
      ship.tiles.forEach(tile => {
        occupiedTiles.push({
          x: ship.location.x + tile.x,
          y: ship.location.y + tile.y,
        });
      });
    });
    const checkedTilesMap = {};
    occupiedTiles.forEach(tile => {
      expect(checkedTilesMap[`${tile.x},${tile.y}`]).toBeUndefined();
      checkedTilesMap[`${tile.x},${tile.y}`] = true;
    })
  })
})