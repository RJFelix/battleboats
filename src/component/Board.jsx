import React from 'react';
import Konva from 'konva';
import { Stage, Layer, Rect } from 'react-konva';
import { XMax, YMax } from '../game/Game';

const TileSize = 20; // px
const TileSpacing = 25; // px
const TileOutlineWidth = 1; // px

const BGColor = 'DeepSkyBlue';
const ShipColor = 'DarkGreen';
const HitColor = 'OrangeRed';
const SunkColor = 'DarkRed';
const HiddenColor = 'DarkGray';
const OutlineColor = 'Black';

class Board extends React.Component {

  render() {
    // calculate ship locations and colors
    const ships = [];
    this.props.player.ships.forEach(ship => {
      ship.tiles.forEach(tile => {
        if(!ship.alive) {
          ships.push({
            x: ship.location.x + tile.x,
            y: ship.location.y + tile.y,
            color: SunkColor,
          })
        } else if(tile.hit) {
          ships.push({
            x: ship.location.x + tile.x,
            y: ship.location.y + tile.y,
            color: HitColor,
          });
        } else {
          ships.push({
            x: ship.location.x + tile.x,
            y: ship.location.y + tile.y,
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