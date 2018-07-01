/* Singleton game manager */

/* Game is, conceptually, a finite state machine

  +-----------+----------+------------------------------------------------------------------+---------------------------+
  |   State   |   Data   |                           Description                            |   Posssible Next States   |
  +-----------+----------+------------------------------------------------------------------+---------------------------+
  | Lobby     | --       | The game lobby                                                   | Playing                   |
  | BeginTurn | playerId | Beginning of a turn; shows what happened on opponent's last turn | Playing                   |
  | Playing   | playerId | Player sees board, makes their shot                              | BeginTurn, EndGame, Lobby |
  | EndGame   | --       | End of game summary screen                                       | Lobby, BeginTurn          |
  +-----------+----------+------------------------------------------------------------------+---------------------------+ 

  +-----------+---------------+------------+---------------------------------------------+
  |   State   |     Event     | Next State |                    Notes                    |
  +-----------+---------------+------------+---------------------------------------------+
  | Lobby     | beginGame     | BeginTurn  | Starts a fresh game                         |
  | Lobby     | continueGame  | BeginTurn  | Resumes a previous game                     |
  | BeginTurn | play          | Playing    |                                             |
  | Playing   | shoot         | BeginTurn  | (if game is still ongoing)                  |
  | Playing   | shoot         | EndGame    | (if this shot ends the game)                |
  | Playing   | returnToLobby | Lobby      | Returns to lobby, preserving the game state |
  | EndGame   | finish        | Lobby      | Clears game state                           |
  +-----------+---------------+------------+---------------------------------------------+

*/

import Ship, { Shapes } from './Ship';

// constants and config

const XMax = 7;
const YMax = 7;

const firstPlayer = 1;

const _States = {
  Lobby: "LOBBY",
  BeginTurn: "BEGIN_TURN",
  Playing: "PLAYING",
  EndGame: "END_GAME",
};

export const States = Object.freeze(_States);

class Game {
  state = States.Lobby;
  players = [];
  moves = [];
  stateChangeListeners = [];

  constructor() {

  }

  /**
   * Set up a new game. Intended for internal use only!
   */
  _setup() {
    const player1 = {
      id: 1,
      ships: [],
    }

    const player1Ships = [
      new Ship(Shapes.Line),
      new Ship(Shapes.Line),
      new Ship(Shapes.Square),
      new Ship(Shapes.El),
    ];

    for(let i = 0; i < player1Ships.length; i++) {
      player1.ships = player1Ships[i].place(player1.ships, XMax, YMax);
    }

    const player2 = {
      id: 2,
      ships: [],
    }

    const player2Ships = [
      new Ship(Shapes.Line),
      new Ship(Shapes.Line),
      new Ship(Shapes.Square),
      new Ship(Shapes.El),
    ];

    player2Ships.forEach(ship => {
      player2.ships = ship.place(player2.ships, XMax, YMax);
    });

    this.players = [player1, player2];
  }

  /**
   * Begin this game. The next state will be BeginTurn.
   */
  beginGame() {
    this._setup();
    this.unsafeSetState(States.BeginTurn, firstPlayer);
  }

  /**
   * Begin a turn. The next state will be Playing.
   */
  play() {
    this.unsafeSetState(States.Playing, this.activePlayer);
  }

  /**
   * Shoot. The next state may be BeginTurn or EndGame.
   * @param {number} atId - which player to shoot at
   * @param {Object} atLocation - the location to shoot at
   * @param {number} atLocation.x
   * @param {number} atLocation.y
   */
  shoot(atId, atLocation) {
    const shotPlayer = this.players.find(p => p.id == atId);
    const result = {
      x: atLocation.x,
      y: atLocation.y,
      hit: false,
      sunk: false,
    }
    shotPlayer.ships.forEach(ship => {
      ship.tiles.forEach(tile => {
        if((atLocation.x === ship.location.x + tile.x)
        && (atLocation.y === ship.location.y + tile.y)) {
          tile.hit = true;
          result.hit = true;
          if(ship.tiles.every(t => t.hit)) {
            ship.alive = false;
            result.sunk = true;
          }
        }
      });
    });
    if(result.hit) {
      if(shotPlayer.ships.every(t => !t.alive)) {
        this.unsafeSetState(States.EndGame, null);
        return result;
      }
    }
    this.unsafeSetState(States.BeginTurn, shotPlayer.id);
    return result;
  }

  /**
   * Return to the lobby, without changing the game information.
   * The next state will be Lobby.
   */
  returnToLobby() {
    this.unsafeSetState(States.Lobby, null)
  }

  /**
   * Finish a game. The next state will be Lobby.
   */
  finish() {
    this._setup();
    this.unsafeSetState(States.Lobby, null);
  }

  /**
   * Register a listener for state changes
   * @param {function} fn 
   */
  onStateChange(fn) {
    this.stateChangeListeners.push(() => fn(this.state, this.activePlayer));
  }

  /**
   * UNSAFELY set the game state.
   * Using this will probably break the game.
   * Intended for internal and testing use.
   * @param {@link States} state 
   * @param {number} activePlayer
   */
  unsafeSetState(state, activePlayer) {
    this.activePlayer = activePlayer;
    this.state = state;
    this.stateChangeListeners.map(fn => fn());
  }

}

export default Game;