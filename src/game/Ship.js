/* A ship */

/* Constants */
const _Shapes = {
  El: 1,
  Square: 2,
  Line: 3,
}

export const Shapes = Object.freeze(_Shapes);

const randomInt = max => Math.floor(Math.random() * Math.floor(max));

class Ship {
  /**
   * Create a ship.
   * @param {@link Shapes} shape 
   */
  constructor(shape) {
    // TODO: probably extract these out
    // to separate concerns (logic vs. constants)
    switch(shape) {
      case Shapes.Square: {
        this.tiles = [
          { x: 0, y: 0 },
          { x: 0, y: 1 },
          { x: 1, y: 0 },
          { x: 1, y: 1 },
        ];
        break;
      }
      case Shapes.Line: {
        // May be vertical or horizontal
        const isHorizontal = (Math.random() > 0.5);
        if(isHorizontal) {
          this.tiles = [
            { x: 0, y: 0 },
            { x: 1, y: 0 },
            { x: 2, y: 0 },
            { x: 3, y: 0 },
          ];
        } else {
          this.tiles = [
            { x: 0, y: 0 },
            { x: 0, y: 1 },
            { x: 0, y: 2 },
            { x: 0, y: 3 },
          ];
        }
        break;
      }
      case Shapes.El: {
        // TODO: generate the 4 possible rotations
        // this is temporarily just the upright L
        this.tiles = [
          { x: 0, y: 0 },
          { x: 0, y: 1 },
          { x: 0, y: 2 },
          { x: 1, y: 2 },
        ];
        break;
      }
      default: {
        // We were fed an invalid shape!
        throw new Error("Invalid shape type.");
      }
    }
    // we don't have a location yet
    this.location = {
      x: null,
      y: null,
    }
    // Set them all to un-hit
    this.tiles = this.tiles.map(t => ({...t, hit: false}));
    this.alive = true;

  }

  /**
   * Place a ship in a valid location.
   * @param {[@link Ship]} ships - ships that have already been placed
   * @param {number} xMax - the max x extent of the game board
   * @param {number} yMax - the max y extent of the game board
   */
  place(ships, xMax, yMax) {
    // do some setup
    const { xExtent, yExtent } = this.tiles.reduce((acc, tile) => {
      const newAcc = {...acc};
      if(tile.x > acc.xExtent) {
        newAcc.xExtent = tile.x;
      }
      if(tile.y > acc.yExtent) {
        newAcc.yExtent = tile.y;
      }
      return newAcc;
    }, { xExtent: 0, yExtent: 0});

    // if there are no other ships we can short circuit here
    if(ships.length === 0) {
      this.location.x = randomInt(xMax - xExtent);
      this.location.y = randomInt(yMax - yExtent);
      return [...ships, this];
    }

    // get all the currently occupied locations
    const occupiedLocations = [];
    ships.forEach(ship => {
      ship.tiles.forEach(tile => {
        occupiedLocations.push({
          x: ship.location.x + tile.x,
          y: ship.location.y + tile.y,
        });
      });
    });

    // Valid locations are ones that, if we placed the ship there,
    // it would not overlap with another ship or the edge of the board
    const validLocations = [];
    for(let proposedX = 0; proposedX <= (xMax - xExtent); proposedX++) {
      for(let proposedY = 0; proposedY <= (yMax - yExtent); proposedY++) {
        let collides = false;
        this.tiles.forEach(tile => {
          occupiedLocations.forEach(({x, y}) => {
            if((proposedX + tile.x === x) && (proposedY + tile.y === y)) {
              collides = true;
            }
          });
        });
        if(!collides) {
          validLocations.push({x: proposedX, y: proposedY});
        }
      }
    }

    // Place the ship in a valid location
    const locIdx = randomInt(validLocations.length);
    this.location = {...validLocations[locIdx]};
    return [...ships, this];
  }
}

export default Ship;