import React from 'react';
import { Stage, Layer, Rect } from 'react-konva';
import { XMax, YMax } from '../game/Game';

const TileSize = 30; // px
const TileSpacing = 33; // px
const TileOutlineWidth = 1; // px

const BGColor = 'DeepSkyBlue';
const ShipColor = 'DarkGreen';
const HitColor = 'OrangeRed';
const SunkColor = 'DarkRed';
const HiddenColor = 'DarkGray';
const OutlineColor = 'Black';

// TODO: Make it so that tiles of the same ship are joined

class Board extends React.Component {

  render() {
    // calculate ship locations and colors
    // -- potential optimization: only do this
    // -- if the tile would be revealed.
    const ships = [];
    this.props.player.ships.forEach(ship => {
      ship.tiles.forEach(tile => {
        const coords = {
          x: ship.location.x + tile.x,
          y: ship.location.y + tile.y,
        };
        if(!ship.alive) {
          ships.push({
            ...coords,
            color: SunkColor,
          })
        } else if(tile.hit) {
          ships.push({
            ...coords,
            color: HitColor,
          });
        } else {
          ships.push({
            ...coords,
            color: ShipColor,
          });
        }
      });
    });

    // create the actual tiles to be rendered
    const tiles = [];
    for(let x = 0; x <= XMax; x++) {
      for(let y = 0; y <= YMax; y++) {
        let color = HiddenColor;
        // should this tile be revealed? if so, set color appropriately
        if(this.props.revealAll || this.props.player.revealedTiles.some(location => location.x === x && location.y === y)) {
          const ship = ships.find(s => s.x === x && s.y == y);
          if(ship) {
            color = ship.color;
          } else {
            color = BGColor;
          }
        }
        tiles.push(
          <Rect
            x={x * TileSpacing}
            y={y * TileSpacing}
            width={TileSize}
            height={TileSize}
            fill={color}
            stroke={OutlineColor}
            strokeWidth={TileOutlineWidth}
            onClick={() => this.props.onClick({ x, y })}
          />
        );
      }
    }
    // NB. This ends up creating 2 canvas elements,
    // one to display and one that detects input.
    return (
      <Stage
        width={TileSpacing * (XMax + 1)}
        height={TileSpacing * (YMax + 1)}
      >
        <Layer>
          {tiles}
        </Layer>
      </Stage>
    )
  }
}

export default Board;