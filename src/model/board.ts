import { Player } from './player';
import { Ship } from './ship';

export class Board {

  player: Player;
  ships: Ship[];
  tiles: Array<any>[];

  constructor(player: Player, tiles: Array<any>[], ships: Ship[]) {
    this.player = player;
    this.tiles = tiles;
    this.ships = ships;
  }

  areAllShipSunk(): boolean {
    return this.ships.every(ship => ship.isSunk());
  }

  getAmountOfSunkenShips() {
    return this.ships.filter(ship => ship.isSunk()).length;
  }
}
