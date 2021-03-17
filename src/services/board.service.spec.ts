import { TestBed, inject } from '@angular/core/testing';

import { BoardService } from './board.service';

describe('BoardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BoardService]
    });
  });

  it('should be created', inject([BoardService], (service: BoardService) => {
    expect(service).toBeTruthy();
  }));

  it('should create board correctly', inject([BoardService], (service: BoardService) => {
    const board = service.createBoard();

    // verify ships are right
    expect(board.ships.length).toBe(10);
    expect(board.ships.filter(s => s.totalTiles === 4).length).toBe(1);
    expect(board.ships.filter(s => s.totalTiles === 3).length).toBe(2);
    expect(board.ships.filter(s => s.totalTiles === 2).length).toBe(3);
    expect(board.ships.filter(s => s.totalTiles === 1).length).toBe(4);

    expect(board.ships.some(s => s.isSunk())).toBeFalsy();
    expect(board.ships.every(s => s.sunkTiles === 0)).toBeTruthy();

    const usedShips = board.ships.reduce((accum, ship) => {
      accum.push({
        ship: ship, tiles: ship.totalTiles, lastCol: null, lastRow: null
      });
      return accum;
    }, []);

    // verify tiles
    expect(board.tiles.length).toBe(10);

    board.tiles.forEach((tileRow, currentRowIndex) => {
      // each row length should be 10
      expect(tileRow.length).toBe(10);

      // for each tile should not be used also ships should be placed in a row/col.
      tileRow.forEach((tile, currentColIndex) => {
        expect(tile.used).toBeFalsy();

        if (tile.ship) {
          const usedShip = usedShips.find(us => us.ship === tile.ship);
          usedShip.tiles -= 1;
          expect(usedShip.tiles).toBeGreaterThanOrEqual(0);

          if (usedShip.lastRow === null) { // first tile used by the ship
            usedShip.lastRow = currentRowIndex; //0
            usedShip.lastCol = currentColIndex; //1
          }
          else { // same row and move one col or same col and move one row.
            if (usedShip.lastRow === currentRowIndex) {
              expect(currentColIndex).toBe(1 + usedShip.lastCol);
              usedShip.lastCol = currentColIndex;
            }
            else if (usedShip.lastCol === currentColIndex) {
              expect(currentRowIndex).toBe((1 + usedShip.lastRow));
              usedShip.lastRow = currentRowIndex;
            }
            else {
              fail('ships are expected to be placed in a straight line.');
            }
          }
        }
      });
    });

    expect(usedShips.some(us => us.tiles !== 0)).toBeFalsy();
  }));
});
