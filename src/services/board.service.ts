import { Injectable } from '@angular/core';
import { Ship } from '../model/ship';
import { RandomUtils } from '../utils/random-utils';
import { Board } from '../model/board';

@Injectable()
export class BoardService {

  constructor() { }

  createBoard(): Board {
    const allShips = [
      new Ship(4),
      new Ship(3),
      new Ship(3),
      new Ship(2),
      new Ship(2),
      new Ship(2),
      new Ship(1),
      new Ship(1),
      new Ship(1),
      new Ship(1)
    ];

    // TODO delegate into a BoardBuilder
    const boardSize = 10;

    const tiles = Array(boardSize).fill(undefined).map(() => {
      return Array(boardSize).fill(undefined).map(() => ({ ship: undefined, used: false }));
    });

    this.placeShipsOnTiles(allShips, tiles);

    return new Board(null, tiles, allShips);
  }

  private placeShipsOnTiles(ships: Ship[], tiles: Array<any>[]) {
    const totalRows = tiles.length;
    const totalCols = tiles[0].length;

    ships.forEach(ship => {
      this.placeShipRandomly(ship, tiles, totalRows, totalCols);
    });
  }

  private placeShipRandomly(ship: Ship, tiles: Array<any> [], totalRows: number, totalCols: number) {
    const randomRow = RandomUtils.getRandomInt(0, totalRows - 1);
    const randomCol = RandomUtils.getRandomInt(0, totalCols - 1);
    console.log('inserting on (row, col): ', randomRow, randomCol, ' ship length: ', ship.totalTiles);

    if (tiles[randomRow][randomCol].ship !== undefined) {
      console.log('NOT inserted 1', tiles);
      this.placeShipRandomly(ship, tiles, totalRows, totalCols);
    } else {
      const vertical = !!RandomUtils.getRandomInt(0, 1);
      console.log('vertical?: ', vertical);
      if (this.checkFitShipOnBoard(ship, tiles, vertical, randomRow, randomCol, totalRows, totalCols)) {
        console.log('YES inserted', tiles);
        this.placeShipOnBoardAtPosition(ship, tiles, vertical, randomRow, randomCol);
      } else {
        console.log('NOT inserted 2', tiles);
        this.placeShipRandomly(ship, tiles, totalRows, totalCols);
      }
    }
  }

  private checkFitShipOnBoard(ship: Ship, tiles: Array<any>[], vertical: boolean, randomRow: number, randomCol: number, totalRows: number, totalCols: number): boolean {
    let shipFits;
    if (vertical) { // move through the rows (same column)
      // check if the entire ship fit on the board
      shipFits = ship.totalTiles <= totalRows - randomRow;

      for (let i = 0; i < ship.totalTiles && shipFits; i++) {
        shipFits = shipFits && tiles[randomRow + i][randomCol].ship === undefined;
      }
    } else { // move through the columns (same row)
      // check if the entire ship fit on the board
      shipFits = ship.totalTiles <= totalCols - randomCol;

      for (let i = 0; i < ship.totalTiles && shipFits; i++) {
        shipFits = shipFits && tiles[randomRow][randomCol + i].ship === undefined;
      }
    }

    return shipFits;
  }

  /**
   * This method assume the ship fit on the board and insert the ship at the given position.
   * In order to check if the ship fits or not use checkFitShipOnBoard.
   * @param ship
   * @param tiles
   * @param vertical
   * @param randomRow
   * @param randomCol
   * @private
   */
  private placeShipOnBoardAtPosition(ship: Ship, tiles: Array<any>[], vertical: boolean, randomRow: number, randomCol: number) {
    if (vertical) { // move through the rows (same column)
      for (let i = 0; i < ship.totalTiles; i++) {
        tiles[randomRow + i][randomCol].ship = ship;
      }
    } else { // move through the columns (same row)
      for (let i = 0; i < ship.totalTiles; i++) {
        tiles[randomRow][randomCol + i].ship = ship;
      }
    }
  }
}
